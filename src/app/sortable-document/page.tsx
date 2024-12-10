"use client";

import { useState, useEffect } from "react";
import SortableDocument from "./sortable-document";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <SortableDocument /> : null;
}
