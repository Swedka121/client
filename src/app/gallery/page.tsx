import Container from "@/components/ui/container";
import axios from "axios";
import { GalleryI } from "../../../stores/galleryStore";
import ImageResourceServer from "@/components/ResourcesSelectors/ImageResourceServer";
import MainHeader from "@/components/Headers/MainHeader";
import MainFooter from "@/components/Footers/MainFooter";

async function getAllCollections() {
  const data: GalleryI[] = await axios
    .get("/gallery/", {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        "Cache-Control": "no-cache",
      },
    })
    .then((data) => data.data)
    .catch(() => {
      return [];
    });

  return data;
}

async function Page() {
  const collections = await getAllCollections();
  return (
    <>
      <MainHeader />
      <Container>
        <section className="w-full h-max flex flex-col gap-4 pt-50 min-h-[100vh]">
          {collections.map((el) => (
            <div key={el.name} className="flex flex-col w-full h-max">
              <h3 className="w-full text-start h-max text-[2rem]">{el.name}</h3>
              <div className="w-full grid grid-cols-4 auto-rows-fr gap-4 max-md:grid-cols-1">
                {el.images.map((el2) => (
                  <ImageResourceServer
                    key={el2._id}
                    path={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${el2._id}`}
                  />
                ))}
              </div>
              <div className="w-full h-[1px] bg-gray-500 mt-10 mb-10"></div>
            </div>
          ))}
        </section>
      </Container>
      <MainFooter />
    </>
  );
}

export default Page;
