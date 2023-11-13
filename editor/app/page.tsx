import Editor from "@/components/editor";
import Uploader from "@/components/uploader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "nwg-360 editor",
  description: "Created by Aite Eboigbe",
};

export default async function Home() {
  return (
    <main className="flex h-full w-full flex-col items-start justify-start gap-6">
      <section className="flex h-full w-full flex-col-reverse justify-center gap-6 py-2">
        <Editor />
        <Uploader />
      </section>
    </main>
  );
}
