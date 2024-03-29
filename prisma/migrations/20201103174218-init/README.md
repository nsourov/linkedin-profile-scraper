# Migration `20201103174218-init`

This migration has been generated by Naimur Rahman Sourov at 11/3/2020, 11:42:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    PRIMARY KEY ("id")
)

CREATE TABLE "Info" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "locationId" TEXT,

    FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "employmentType" TEXT,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "endDateIsPresent" BOOLEAN NOT NULL,
    "durationInDays" INTEGER NOT NULL,
    "description" TEXT,
    "locationId" TEXT,
    "profileId" TEXT,

    FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "degreeName" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "durationInDays" INTEGER NOT NULL,
    "profileId" TEXT,

    FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "endorsementCount" INTEGER NOT NULL,
    "profileId" TEXT,

    FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "infoId" TEXT NOT NULL,
    "instanceId" TEXT,

    FOREIGN KEY ("infoId") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "instanceId" TEXT,

    FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

CREATE TABLE "Instance" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "runningUrl" TEXT,
    "error" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201103174218-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,95 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+model Location {
+  id         String       @id @default(cuid())
+  city       String?
+  province   String?
+  country    String?
+  Experience Experience[]
+  Info       Info[]
+}
+
+model Info {
+  id          String    @id @default(cuid())
+  fullName    String
+  title       String
+  url         String
+  description String?
+  photo       String?
+  locationId  String?
+  location    Location? @relation(fields: [locationId], references: [id])
+  Profile     Profile[]
+}
+
+model Experience {
+  id               String    @id @default(cuid())
+  title            String
+  company          String?
+  employmentType   String?
+  startDate        String
+  endDate          String?
+  endDateIsPresent Boolean
+  durationInDays   Int
+  description      String?
+  locationId       String?
+  profileId        String?
+  location         Location? @relation(fields: [locationId], references: [id])
+  Profile          Profile?  @relation(fields: [profileId], references: [id])
+}
+
+model Education {
+  id             String   @id @default(cuid())
+  schoolName     String
+  degreeName     String
+  fieldOfStudy   String
+  startDate      String
+  endDate        String?
+  durationInDays Int
+  profileId      String?
+  Profile        Profile? @relation(fields: [profileId], references: [id])
+}
+
+model Skill {
+  id               String   @id @default(cuid())
+  skillName        String
+  endorsementCount Int
+  profileId        String?
+  Profile          Profile? @relation(fields: [profileId], references: [id])
+}
+
+model Profile {
+  id          String       @id @default(cuid())
+  url         String
+  infoId      String
+  instanceId  String?
+  info        Info         @relation(fields: [infoId], references: [id])
+  Instance    Instance?    @relation(fields: [instanceId], references: [id])
+  education   Education[]
+  experiences Experience[]
+  skills      Skill[]
+}
+
+model Url {
+  id         String    @id @default(cuid())
+  url        String
+  instanceId String?
+  Instance   Instance? @relation(fields: [instanceId], references: [id])
+}
+
+model Instance {
+  id         String    @id @default(cuid())
+  status     String
+  runningUrl String?
+  error      String?
+  createdAt  DateTime  @default(now())
+  updatedAt  DateTime  @updatedAt
+  profiles   Profile[]
+  urls       Url[]
+}
```


