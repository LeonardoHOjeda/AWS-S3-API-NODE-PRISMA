import fs from 'fs'
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import config from '../../config/config'
import { Readable } from 'stream'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

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
  const command = getObjectCommand(fileName)

  const result = await clientS3.send(command)

  const readableStream = result.Body as Readable
  const writeStream = fs.createWriteStream(`./downloads/${fileName}`)
  readableStream.pipe(writeStream)
}

export async function uploadFileToS3Service (file: any): Promise<any> {
  // TODO Almacenar en la base de datos la URL prefirmada
  const stream = fs.createReadStream(file.tempFilePath)

  const uploadParams = {
    Bucket: config.AWS.BUCKET_NAME!,
    Key: file.name,
    Body: stream
  }

  const command = new PutObjectCommand(uploadParams)
  return await clientS3.send(command)
}
