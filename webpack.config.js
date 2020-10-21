const webpack = require("webpack");
const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "production",
};