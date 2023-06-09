import fs from 'fs'
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import config from '../../config/config'
import { Readable } from 'stream'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const clientS3 = new S3Client({
  region: config.AWS.BUCKET_REGION,
  credentials: {
    accessKeyId: config.AWS.PUBLIC_KEY!,
    secretAccessKey: config.AWS.SECRET_KEY!
  }
})

const getObjectCommand = (fileName: string) => {
  return new GetObjectCommand({
    Bucket: config.AWS.BUCKET_NAME!,
    Key: fileName
  })
}

const prisma = new PrismaClient()

export async function getFilesFromS3Service (): Promise<any> {
  const command = new ListObjectsCommand({
    Bucket: config.AWS.BUCKET_NAME!
  })
  return await clientS3.send(command)
}

export async function getSingleFileFromS3Service (fileName: string): Promise<any> {
  const command = getObjectCommand(fileName)

  return await clientS3.send(command)
}

export async function getFileSignedUrlFromS3Service (fileName: string): Promise<any> {
  const command = getObjectCommand(fileName)

  return await getSignedUrl(clientS3, command, { expiresIn: 3600 })
}

export async function downloadFileFromS3Service (fileName: string): Promise<any> {
  const file = await prisma.archivo.findUnique({
    where: {
      nombreArchivo: fileName
    },
    select: {
      nombreArchivo: true,
      uuid: true,
      extensionArchivo: true
    }
  })

  if (file === null) throw new Error('File not found')

  const keyAWS = `${file.nombreArchivo}${file.uuid}.${file.extensionArchivo}`

  const signedUrlFile = await getFileSignedUrlFromS3Service(keyAWS)
  const command = getObjectCommand(keyAWS)

  const result = await clientS3.send(command)

  const readableStream = result.Body as Readable
  const writeStream = fs.createWriteStream(path.join(__dirname, fileName))
  console.log(__dirname)

  readableStream.pipe(writeStream)

  return {
    uuid: file.uuid,
    signedUrlFile
  }
}

export async function uploadFileToS3Service (file: any): Promise<any> {
  const stream = fs.createReadStream(file.tempFilePath)

  const nombreArchivoSinEspacios: string = file.name.replace(/\s/g, '_')
  const uuid: string = uuidv4().substring(0, 10)
  const fileExtension: string = file.name.split('.').pop()
  const nombreArchivoBase: string = nombreArchivoSinEspacios.slice(0, file.name.lastIndexOf('.'))

  const nombreArchivo: string = `${nombreArchivoBase}${uuid}.${fileExtension}`

  const uploadParams = {
    Bucket: config.AWS.BUCKET_NAME!,
    Key: nombreArchivo,
    Body: stream
  }

  const command = new PutObjectCommand(uploadParams)

  const newFile = await prisma.archivo.create({
    data: {
      nombreArchivo: nombreArchivoBase,
      uuid,
      extensionArchivo: fileExtension,
      awsKey: config.AWS.PUBLIC_KEY!,
      awsBucket: config.AWS.BUCKET_NAME!,
      awsRegion: config.AWS.BUCKET_REGION!
    }
  })

  return {
    cliente: await clientS3.send(command),
    archivo: newFile
  }
}
