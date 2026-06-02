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
  school: [
  "school1.jpg",
  "school2.jpg",
  "school3.jpg",
  "school4.jpg",
  "school5.jpg",
  "school6.jpg",
  "school7.jpg",
  "school8.jpg",
  "school9.jpg",
  "school10.jpg",
  "school11.jpg",
  "school12.jpg",
  "school13.jpg",
  "school14.jpg",
  ],
  bsc: [
     "bsc1.JPG",
  "bsc2.JPG",
  "bsc3.JPG",
  "bsc4.jpg",
  "bsc5.jpg",
  "bsc6.jpg",
  "bsc7.jpg",
  "bsc8.jpg",
  "bsc9.jpg",
  "bsc10.jpg",
  "bsc11.jpg",
  "bsc12.jpg",
  "bsc13.jpg",
  "bsc14.jpg",
  "bsc15.jpg",
  "bsc16.jpg",
  "bsc17.jpg",
  "bsc18.jpg",
  "bsc19.jpg",
  "bsc20.jpg",
  "bsc21.jpg",
  "bsc22.jpg",
  "bsc23.jpg",
  "bsc24.jpg",
  "bsc25.jpg",
  "bsc26.jpg",
  "bsc27.jpg",
  "bsc28.jpg",
  "bsc29.jpg",
  "bsc30.jpg",
  "bsc31.jpg",
  ],
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
