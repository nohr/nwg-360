import { working_copy } from "@/common/state";
import Image from "next/image";
import { useSnapshot } from "valtio";

export default function ImageLayers() {
  const { images, currentIndex, dimensions } = useSnapshot(working_copy);
  return (
    <>
      {images.length > 0 &&
        images.map((image, index) => (
          <Image
            key={image}
            alt="building"
            src={image}
            fill
            className="pointer-events-none absolute left-0 top-0 -z-10"
            style={{
              visibility: index === currentIndex ? "visible" : "hidden",
              aspectRatio: `${dimensions.width}/${dimensions.height}`,
            }}
          />
        ))}
    </>
  );
}
