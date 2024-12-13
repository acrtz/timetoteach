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

// Example schema (you can import your schema from another file)
// const schema: BlockType[] = [
//   {
//     type: "title",
//     value: "AP Chemistry Assignment: Atomic Theory and Structure of Atoms",
//     align: "center",
//   },
//   { type: "spacer", height: 20 },
//   {
//     type: "subtitle",
//     value: "Section 1: Atomic Theory Overview",
//     align: "left",
//   },
//   {
//     type: "paragraph",
//     value:
//       "Atomic theory explains the nature of matter by stating that matter is composed of discrete units called atoms. This section will introduce you to the structure of atoms, electron configurations, periodic trends, and Coulomb’s law.",
//   },
//   { type: "spacer", height: 20 },
//   { type: "subtitle", value: "Section 2: Structure of Atoms", align: "left" },
//   {
//     type: "paragraph",
//     value:
//       "Atoms consist of protons, neutrons, and electrons. The nucleus contains protons and neutrons, while electrons orbit around the nucleus in electron clouds.",
//   },
//   { id: "fbaidfnkd", type: "math", value: "Z = N + P", align: "center" },
//   {
//     type: "paragraph",
//     value:
//       "Where Z is the atomic number, N is the number of neutrons, and P is the number of protons.",
//   },
//   { type: "spacer", height: 20 },
//   {
//     type: "subtitle",
//     value: "Section 3: Electron Configurations",
//     align: "left",
//   },
//   {
//     type: "paragraph",
//     value:
//       "Electron configurations describe the arrangement of electrons in an atom. Understanding these configurations is essential for predicting chemical behavior.",
//   },
//   {
//     type: "text",
//     label: "Write the electron configuration for Oxygen (O)",
//     placeholder: "Enter your answer",
//     helperText: "Use the format: 1s² 2s² 2p⁴",
//     required: true,
//   },
//   { type: "spacer", height: 20 },
//   { type: "subtitle", value: "Section 4: Periodic Trends", align: "left" },
//   {
//     type: "paragraph",
//     value:
//       "Periodic trends refer to patterns in the properties of elements across the periodic table. Important trends include atomic radius, electronegativity, and ionization energy.",
//   },
//   {
//     type: "list",
//     items: ["Atomic Radius", "Electronegativity", "Ionization Energy"],
//     variant: "unordered",
//   },
//   { type: "spacer", height: 20 },
//   { type: "subtitle", value: "Section 5: Coulomb’s Law", align: "left" },
//   {
//     type: "paragraph",
//     value:
//       "Coulomb’s Law describes the force between two charged particles. It states that the force is proportional to the product of the charges and inversely proportional to the square of the distance between them.",
//   },
//   {
//     id: "1235214",
//     type: "math",
//     value: "F = k \\frac{|q_1 q_2|}{r^2}",
//     align: "center",
//   },
//   {
//     type: "paragraph",
//     value:
//       "Where F is the force between the charges, k is Coulomb's constant, q1 and q2 are the amounts of the charges, and r is the distance between them.",
//   },
//   { type: "spacer", height: 20 },
//   {
//     type: "subtitle",
//     value: "Section 6: Reflection Questions",
//     align: "left",
//   },
//   {
//     type: "textarea",
//     label: "Discuss how periodic trends affect chemical reactivity.",
//     placeholder: "Type your explanation here",
//     helperText: "Provide a clear and concise explanation.",
//     required: true,
//     rows: 3,
//   },
//   {
//     type: "checkbox",
//     label: "I have completed all sections of this assignment.",
//     helperText: "Check if complete.",
//     required: true,
//   },
// ];

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
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
  const mathBlocks = useMemo(
    () => schema.filter((item) => item.type === "math"),
    [schema]
  );
  return pdf ? (
    <div>
      <div className="absolute -z-50">
        {mathBlocks.map((item) => (
          <MathBlock key={item.id} block={item as TMathBlock} />
        ))}
      </div>

      <PDFViewer style={{ width: "100%", height: "100vh" }} showToolbar={false}>
        {pdf}
      </PDFViewer>
      <PDFDownloadLink document={pdf} fileName={"test"}>
        <Button className="mr-4">Download Schedule</Button>
      </PDFDownloadLink>
    </div>
  ) : null;
}

const PdfDocument = ({ schema }: { schema: BlockType[] }) => {
  return (
    <Document pageMode="fullScreen">
      <Page style={styles.page} size="A4">
        {schema.map((item, idx) => (
          <Item item={item} key={idx} />
        ))}
      </Page>
    </Document>
  );
};
