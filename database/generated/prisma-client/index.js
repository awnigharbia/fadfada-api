"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Hashtag",
    embedded: false
  },
  {
    name: "Story",
    embedded: false
  },
  {
    name: "Feedback",
    embedded: false
  },
  {
    name: "StoryReport",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  },
  {
    name: "Notification",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Like",
    embedded: false
  },
  {
    name: "Device",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/awni-gharbia-ca9484/fadfada-api/dev`
});
exports.prisma = new exports.Prisma();
