import { db } from "@/app/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server"; 
const f = createUploadthing();
 
const auth =  (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    
    .middleware(async ({ req }) => {
      const {getUser}=getKindeServerSession()
      const user = await getUser()  
      if(!user || !user.id) throw new Error('Unauthorized')

      
      return {userId:user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
        const createdFile = await db.file.create({
            data:{
              key:file.key,
              name:file.name,
              userId:metadata.userId,
              url:file.url,
              //url:`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
              uploadStatus:'PROCESSING',
            }
        })
      
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;