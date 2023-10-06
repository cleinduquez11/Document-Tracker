import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import FileViewer from "react-file-viewer";

export function Viewer() {
  const file =
    "http://localhost:5000/static/1696571633945-Research Papers in the Sciences.pdf?authToken=123";

  const docs = [
    {
      uri: "http://localhost:5000/static/1696571633945-Research Papers in the Sciences.pdf?authToken=123",
    },

    {
      uri: "http://localhost:5000/static/1696570689997-IMG20230923074254.jpg?authToken=123",
    },
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  //   return <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />;
  // return <FileViewer filePath={file} />;
  return (
    <iframe
      src="https://docs.google.com/viewer?url=http://localhost:5000/static/1696571633945-Research Papers in the Sciences.pdf?authToken=123&embedded=true"
      // style="width:600px; height:500px;"
      // frameBorder="0"
    ></iframe>
  );
}
