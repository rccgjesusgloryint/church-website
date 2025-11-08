"use client";

import { getSermonById } from "@/lib/queries";
import type { Sermon } from "@/lib/types";
import React, { useEffect, useState } from "react";

type Props = {
  params: { id: number | undefined };
};

const Sermon = ({ params }: Props) => {
  const [sermon, setSermon] = useState<Sermon>();

  useEffect(() => {
    const getData = async () => {
      const response = await getSermonById(Number(params.id!));
      setSermon(response);
    };
    getData();
  }, []);
  return (
    <div>
      <div>{sermon?.sermonTitle}</div>
    </div>
  );
};

export default Sermon;
