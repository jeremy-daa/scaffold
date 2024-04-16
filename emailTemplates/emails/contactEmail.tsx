interface contactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}
import React from "react";
import {
  Tailwind,
  Html,
  Font,
  Body,
  Head,
  Preview,
  Container,
  Img,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

const contactEmail = ({}) => {
  return (
    <Html
      style={{
        backgroundColor: "#f3f4f6",
      }}
    >
      <Head />
      <Preview>New contact form report!</Preview>
      <Tailwind>
        <Body>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
          <Container className="w-full h-full my-12 border-[1px] border-[#acacace4] border-solid rounded-sm">
            <Container className="flex items-start  justify-center text-center min-w-[500px] pb-6">
              <Img
                src={`/static/chiraro_blue.svg`}
                alt="Vercel"
                className="pt-10 pb-8 my-0 mx-auto w-[70px]"
              />
              <Container className="my-0 mx-auto">
                <Container className="text-3xl tracking-wider font-light text-[#192655]">
                  Contact Report
                </Container>
                <Container className="w-full justify-start text-start min-w-[500px] py-0 mt-6">
                  <h2 className="mt-2 mb-3 py-0 px-2 text-xl font-thin text-start w-full text-[#192655]">
                    Name: &emsp;&emsp;Hello
                  </h2>
                  <Container className="my-0 py-0 h-[1px] border-0 rounded-sm min-w-full bg-[#1926552b]"></Container>
                </Container>
                <Container className="w-full justify-start text-start min-w-[500px] py-0 mb-0">
                  <h2 className="mt-2 mb-3 py-0 px-2 text-xl font-thin text-start w-full text-[#192655]">
                    Email: &emsp;&emsp; Hello
                  </h2>
                  <Container className="my-0 py-0 h-[1px] border-0 rounded-sm min-w-full bg-[#1926552b]"></Container>
                </Container>
                <Container className="w-full justify-start text-start min-w-[500px] py-0 mb-0">
                  <h2 className="mt-2 mb-3 py-0 px-2 text-xl font-thin text-start w-full text-[#192655]">
                    Phone: &emsp;&emsp;Hello
                  </h2>
                </Container>
                <Container className="w-full justify-start text-start min-w-[500px] py-0 mb-6">
                  <Container className="my-0 py-0 h-[1px] border-0 rounded-sm min-w-full bg-[#1926552b]"></Container>
                  <h2 className="mt-2 mb-3 py-0 px-2 text-xl font-thin text-start w-full text-[#192655]">
                    Message: &emsp;&emsp;Hello
                  </h2>
                  <Container className="my-0 py-0 h-[1px] border-0 rounded-sm min-w-full bg-[#1926552b]"></Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default contactEmail;
