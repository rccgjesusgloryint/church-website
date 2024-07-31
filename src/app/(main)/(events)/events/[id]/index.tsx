import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EventDescription } from "@/lib/types";

import { useModal } from "@/providers/modal-provider";

import Image from "next/image";
import CustomModal from "../../../../../../components/global/custom-modal";

interface EventProps {
  event: EventDescription;
}

export const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/events">Events</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Event</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const Event = ({ event }: EventProps) => {
  const { setOpen } = useModal();
  return (
    <div>
      {event?.description.eventPosterImage ? (
        <div>
          <Image
            src={event.description.eventPosterImage}
            alt="poster-image"
            width={500}
            height={500}
            onClick={() =>
              setOpen(
                <CustomModal title="" subheading="">
                  <Image
                    src={event.description.eventPosterImage}
                    alt="poster-image"
                    width={1000}
                    height={1500}
                  />
                </CustomModal>
              )
            }
            className={"hidden sm:flex"}
          />
          <Image
            src={event.description.eventPosterImage}
            alt="poster-image"
            width={300}
            height={300}
            className={"flex sm:hidden"}
          />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
