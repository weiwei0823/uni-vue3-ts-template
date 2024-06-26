const svgIconsList = require.context(
  "../../static/img/svg-icons",
  false,
  /\.svg$/
);

const processedData = {};
const data = svgIconsList.keys().map(svgIconsList);
for (const key in data) {
  const fileName = data[key].split("/").pop().split(".")[0];
  processedData[fileName] = data[key];
}

console.log("processedData", processedData);
export default processedData;
