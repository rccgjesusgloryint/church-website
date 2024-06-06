import React from "react";

type GridLayout = {
  cls: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sides: number;
  fill: boolean;
  color?: string | any;
};

const GridLayout = ({ cls, sides, fill, color }: GridLayout) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cls}, minmax(0, 1fr))`,
    gap: `${sides}px`,
  };

  const defaultColor: string | any = color ? color : "bg-red-700";

  return (
    <section className={"h-full px-[20px] z-50 absolute w-full"}>
      <div style={gridStyle} className={"h-full"}>
        {Array.from({ length: cls }).map((_, index) => (
          <div
            key={index}
            className={
              fill
                ? `grid-cols-1 ${defaultColor} opacity-30 w-full`
                : `grid-cols-1 border-x-[1px] ${defaultColor} w-full`
            }
          ></div>
        ))}
      </div>
    </section>
  );
};

export default GridLayout;
