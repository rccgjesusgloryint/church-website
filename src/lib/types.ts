import { Comment } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export type UserExternalId = {
  externalId: string;
};
export type UserDetails = {
  name: string | null | undefined;
  email: string;
};

export type CreateMediaType = {
  id?: string;
  type?: string | null;
  name: string;
  link: string;
  externalId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
export type UploadMultipleFiles = {
  key?: string | undefined;
  type?: string | undefined;
  name: string;
  customId?: string | undefined;
  severData?: string | undefined;
  url: string;
}[];

export type CreateEventType = {
  id?: number;
  event: string;
  date: string[];
  location: string;
  description: {
    eventPosterImage: string;
    eventDescription: string;
  };
};

export type GalleryType = string[];

export type EventType = {
  id: number;
  event: string;
  date: string[];
  location: string;
  description: object | JsonValue;
}[];

export type EventDetail = {
  eventId?: string;
  eventPosterImage: string;
  eventDescription: string;
};

export type EventDescription = {
  description: {
    eventPosterImage: string;
    eventDescription: string;
  };
  location: string;
};

export type GetAllImages = {
  link: string;
  name: string;
}[];

export type SendNewsletterEmailType = {
  email: string;
}[];

export type NewletterEmail = {
  email: string;
}[];

// export type CreateSermon = Prisma.SermonCreateInput;
export type CreateSermon = {
  id?: number;
  videoUrl: string;
  sermonTitle: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Tag = {
  id?: number;
  tagName: string;
  sermons?: [];
  sermonId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// export type Sermon = {
//   id: number;
//   videoUrl: string;
//   previewImageUrl: string;
//   sermonTitle: string;
//   tags: Tags;
//   createdAt: Date;
//   updatedAt: Date;
// };
export type Sermon = {
  id?: number;
  videoUrl: string;
  sermonTitle: string;
  tags: string[];
  likes?: number | null;
  comments?: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Tags = Tag[];

export type EventTrack = {
  id?: string;
  event_type: string;
  event_calls: number;
  createdAt: Date;
  updatedAt: Date;
};
