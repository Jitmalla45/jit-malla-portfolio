const memoryRoot = "/memories";

const createMemoryItems = (folder, files) =>
  files.map((file) => {
    if (typeof file === "string") {
      return {
        src: `${memoryRoot}/${folder}/${file}`,
        alt: `${folder} memory`,
      };
    }

    return {
      ...file,
      src: file.src || `${memoryRoot}/${folder}/${file.file}`,
    };
  });

export const memories = {
  school: [],
  bsc: [],
  msc: [],
  phd: [],
};

export const memorySections = [
  {
    id: "school",
    eyebrow: "School Memories",
    title: "School Memories",
    subtitle: "The first sparks of curiosity, discipline, and shared beginnings.",
    items: createMemoryItems("school", memories.school),
  },
  {
    id: "bsc",
    eyebrow: "BSc Journey",
    title: "BSc Journey",
    subtitle: "Foundations in computer science, campus life, and the first steps toward research.",
    items: createMemoryItems("bsc", memories.bsc),
  },
  {
    id: "msc",
    eyebrow: "MSc Journey",
    title: "MSc Journey",
    subtitle: "Advanced study, deeper experiments, and the rhythm of university research life.",
    items: createMemoryItems("msc", memories.msc),
  },
  {
    id: "phd",
    eyebrow: "PhD Journey",
    title: "PhD Journey",
    subtitle: "The next research chapter, shaped by AI, inquiry, and long-horizon ambition.",
    items: createMemoryItems("phd", memories.phd),
  },
];
