"use client";

import { useState, useEffect } from "react";
import { SortableExample } from "./sortable";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <SortableExample /> : null;
}
