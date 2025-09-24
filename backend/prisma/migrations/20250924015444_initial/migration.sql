-- CreateTable
CREATE TABLE "public"."Link" (
    "id" SERIAL NOT NULL,
    "shortCode" VARCHAR(20) NOT NULL,
    "originalUrl" VARCHAR(2048) NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortCode_key" ON "public"."Link"("shortCode");
