"use client";

import { useState, useEffect } from "react";
import DocumentBuilder from "./document-builder";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <DocumentBuilder /> : null;
}