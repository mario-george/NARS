/* eslint-disable jsx-a11y/alt-text */
import { CourseData } from "@/components/courseSpecsPdf/part1";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { createTw } from "react-pdf-tailwind";

// Font.register({
//   family: "Roboto",
//   src: "/Roboto-Light.ttf",
// });
const styles2 = {
  container: {
    borderRadius: 230,
    backgroundColor: '#CCCCCC',
    padding: 10,
  },
};
const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    width: screen,
    // fontFamily: "Roboto",
 
  },
});
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});
const PDF = () => {
  return (
    <Document
      style={{ width: "1000px" }}
      width={1000}
      height={2000}
      className="bg-red-500 w-full"
      scale={2}
    >
       <Page size="A4" style={tw("p-12 ")}>
        <Text className={`px-12`}>
          <Text className={`px-12 bg-red-500`}>Hello World</Text>
          <Text className={`px-12`}>This is a sample PDF document</Text>
        </Text>
        <View style={tw(`contentAddUser2 flex flex-col gap-10`)}>
          <Text style={tw(`underline mb-1`)}>-Course Data:</Text>
          <Text style={tw(`flex gap-20 `)}>
            <Text style={tw(`flex flex-col gap-5 w-1/3 bg-red-500`)}>
              <Text>Course Code & Title:</Text>
              <View
              style={styles2.container}

               
              >
                <Text  style={tw(
                  `block w-full  text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight   bg-rounded-lg  w-full mr-[20rem]`
                )}>sad</Text>
              </View>
              <Text style={tw(`input-form w-full`)} />
            </Text>
            <Text style={tw(`flex flex-col gap-5  w-2/5`)}>
              <Text>Semester/Year:</Text>
              <Text
                style={tw(
                  `block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight   bg-rounded-lg  w-full`
                )}
              >
                sad
              </Text>
            </Text>
          </Text>

          <Text style={tw(`flex gap-20 `)}>
            <Text style={tw(`flex flex-col gap-5 w-1/3`)}>
              <Text>Specialization:</Text>
              <Text style={tw(`input-form w-full`)} />
            </Text>
            <Text style={tw(`flex flex-col gap-5  w-2/5`)}>
              <Text>Contact Hours:</Text>
              <Text style={tw(`input-form  w-full`)} />
            </Text>
          </Text>

          <Text style={tw(`flex gap-20 `)}>
            <Text style={tw(`flex flex-col gap-5 w-1/3`)}>
              <Text>Lecture:</Text>
              <Text style={tw(`input-form w-full`)} />
            </Text>
            <Text style={tw(`flex flex-col gap-5  w-2/5`)}>
              <Text>Practical/Practice:</Text>
              <Text style={tw(`input-form  w-full`)} />
            </Text>
          </Text>

          <Text style={tw(`flex justify-end`)}>
            <Text
              style={tw(
                `w-[6rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`
              )}
            >
              <Text>Next</Text>
            </Text>
          </Text>
        </View>
      </Page>
      <Page style={styles.body}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Text wrap={false} style={{ alignSelf: "flex-end" }}>
            Goodbye,
            world!hgdkljfhsalhgfljadhsgflhasdlhfgsaljdhgflhasgflhgasdl;hfg;aksdjgf;kjsdahf;kjhasd;kjhf;kjashdf;kjhasd;kjfhjks;adhfkjhsadk;jfhaskjdhfkjsahdfkjhsadkj;hfkjsdhfkjhasd;kjhfkjsadhfkjhsda;kjh;
          </Text>
        </View>
        <View>
          <Image src="/assets/image.png" />
        </View>
      </Page>
      <Page style={styles.body}>
        <Text className="underline mb-1 bg-red-500">-Course Data:</Text>
      </Page>
      <Page size="A4" style={tw("p-12")}>
        <View style={tw("p-20 bg-gray-100")}>
          <Text style={tw("text-custom text-3xl")}>Section #1</Text>
        </View>
        <View style={tw("mt-12 px-8 rotate-2")}>
          <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
        </View>
      </Page>
      <Page size="A4" style={tw("p-12")}>
        <View style={tw("p-20 bg-gray-100")}>
          <Text style={tw("text-custom text-3xl")}>Section #1</Text>
        </View>
        <View style={tw("mt-12 px-8 rotate-2")}>
          <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
        </View>
      </Page>
     
    </Document>
  );
};
const PDFView = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <PDFViewer style={{ width: "100vw", height: "100vw" }}>
      <PDF />
    </PDFViewer>
  );
};
export default PDFView;
