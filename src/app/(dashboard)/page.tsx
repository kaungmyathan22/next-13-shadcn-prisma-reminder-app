import CollectionCard from "@/components/CollectionCard/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn/CreateCollectionBtn";
import SadFace from "@/components/Icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMessageFallback />}>
        <WelcomeMesssage />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMesssage() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome,
        <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

function WelcomeMessageFallback() {
  return (
    <div className="flex w-full mb-12 gap-y-2">
      <h1 className="text-4xl font-bold flex-col flex gap-y-2">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[350px] h-[36px]" />
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });
  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started.
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }
  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
