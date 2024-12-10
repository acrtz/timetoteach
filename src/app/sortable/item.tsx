"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { forwardRef, useMemo } from "react";

export const Item = forwardRef(
  ({ children, active, item, ...props }: any, ref: any) => {
    // const component = useMemo(() => {
    //   switch (item.value) {
    //     case "button":
    //       return <Button>Button</Button>;
    //     case "title":
    //       return <h1>Title</h1>;
    //     case "input":
    //       return <Input placeholder="Input" />;
    //   }
    // }, [item]);

    return (
      <div {...props} ref={ref} className={active ? "opacity-0 w-full" : ""}>
        <div className="w-full bg-red-500 mb-6 h-10 flex justify-center items-center">
          {item}
        </div>
      </div>
    );
  }
);
