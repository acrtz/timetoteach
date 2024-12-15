"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
  PDFViewer,
  Page,
  Document,
} from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import { MathBlock } from "@/components/math-block";
import { BlockType, TMathBlock } from "@/types";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => null,
  }
);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 6,
  },
  math: {
    marginBottom: 6,
    // fontFamily: "Helvetica-Oblique",
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 4,
  },
  spacer: {
    height: 20,
  },
  fieldLabel: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  fieldHelper: {
    fontSize: 10,
    color: "gray",
  },
});

const Math = ({ item }: { item: any }) => {
  const [image, setImage] = useState<{
    url: string;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    generateImage();
  }, []);

  const generateImage = () => {
    const element = document.getElementById(item.id);
    if (!element) return;
    const rect = element.getBoundingClientRect();

    htmlToImage.toPng(element).then(function (dataUrl) {
      setImage({
        url: dataUrl,
        width: rect.width / 3,
        height: rect.height / 3,
      });
    });
  };

  return image ? (
    <PDFImage
      src={image.url}
      style={{ width: image.width, height: image.height }}
    />
  ) : null;
};

const Item = ({ item }: { item: any }) => {
  switch (item.type) {
    case "title":
      return (
        <Text style={[styles.title, { textAlign: item.align || "left" }]}>
          {item.value}
        </Text>
      );
    case "subtitle":
      return (
        <Text style={[styles.subtitle, { textAlign: item.align || "left" }]}>
          {item.value}
        </Text>
      );
    case "paragraph":
      return <Text style={styles.paragraph}>{item.value}</Text>;
    case "spacer":
      return <View wrap={false} style={{ marginBottom: item.height || 10 }} />;
    case "math":
      return <Math item={item} />;

    case "list":
      return (
        <View wrap={false} style={{ marginBottom: 10 }}>
          {item.items.map((listItem, liIdx) => (
            <Text key={liIdx} style={styles.listItem}>
              • {listItem}
            </Text>
          ))}
        </View>
      );
    case "text":
    case "textarea":
      return (
        <View wrap={false} style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.fieldLabel}>{item.label}</Text>
          {item.helperText && (
            <Text style={styles.fieldHelper}>{item.helperText}</Text>
          )}
          {Array.from({ length: item.rows || 1 }).map((_, i) => (
            <View
              wrap={false}
              key={i}
              style={{
                height: "30px",
                borderBottom: "1px solid gray",
                width: "100%",
                marginHorizontal: "auto",
              }}
            />
          ))}
        </View>
      );
    case "checkbox":
      return (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>{item.label}</Text>
          {item.helperText && (
            <Text style={styles.fieldHelper}>{item.helperText}</Text>
          )}
        </View>
      );
    // Since we cannot create interactive fields in @react-pdf,
    // we will just display the label and helper text.
    default:
      return null;
  }
};

export default function PdfView({ schema }: { schema: BlockType[] }) {
  const [pdf, setPdf] = useState<any>(null);

  useEffect(() => {
    setPdf(PdfDocument({ schema }));
  }, [schema]);

  return pdf ? (
    <div>
      <MathImages schema={schema} />
      <PDFViewer style={{ width: "100%", height: "100vh" }} showToolbar={false}>
        {pdf}
      </PDFViewer>
      <PDFDownloadLink document={pdf} fileName={"test"}>
        <Button className="mr-4">Download Schedule</Button>
      </PDFDownloadLink>
    </div>
  ) : null;
}

const MathImages = ({ schema }: { schema: BlockType[] }) => {
  const mathBlocks = useMemo(
    () => schema.filter((item) => item.type === "math"),
    [schema]
  );
  return (
    <div className="absolute -z-50">
      {mathBlocks.map((item) => (
        <MathBlock key={item.id} block={item as TMathBlock} />
      ))}
    </div>
  );
};

const PdfDocument = ({ schema }: { schema: BlockType[] }) => {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        {schema.map((item, idx) => (
          <Item item={item} key={idx} />
        ))}
      </Page>
    </Document>
  );
};
