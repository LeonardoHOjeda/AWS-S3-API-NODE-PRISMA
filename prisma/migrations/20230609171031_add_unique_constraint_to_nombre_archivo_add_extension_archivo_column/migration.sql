-- AlterTable
ALTER TABLE "archivos" ALTER COLUMN "created_at" SET DEFAULT NOW(),
ALTER COLUMN "extension_archivo" DROP DEFAULT;
