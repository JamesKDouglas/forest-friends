
const reservations = [
  {
    email: "hedge@hog.com",
    customerName: "Mama Hedgehog",
    childNames: "Johnny Hedgehog",
    amount: 100,
    paid: false,
    notes: "Johnny is spikey so shouldn't sit too close to other animals, but is very friendly.",
    scheduleId: 1,
  },
  {
    email: "rabbit@forestcreatures.com",
    customerName: "Mama Rabbit",
    childNames: "Bunbun Rabbit",
    amount: 100,
    paid: true,
    notes: "Bunbun loves carrots for snacktime. Or meal time. All the time, really. The more carrrots the better.",
    scheduleId: 1,
  },
  {
    email: "deer@tallcreatures.com",
    customerName: "Papa Dear",
    childNames: "Bambi Dear",
    amount: 100,
    paid: true,
    notes: "Bambi has been traumatized by the death of their mother earlier this year (shot by a hunter), please be extra nice. She is very scared of firearms, even drawings or photos of them.",
    scheduleId: 2,
  },
  {
    email: "bear@bear.com",
    customerName: "Papa Bear",
    childNames: "Teddy Bear",
    amount: 100,
    paid: true,
    notes: "Teddy is just finished drinking milk and eats solid food but still plays nice with other animals. I do suggest keeping her away from the smaller tastier ones though. Giving her lots of sedge grass to eat helps reduce her tendancy to eat others. I'm signing her up for the predator schedule, which is #3, right? I'm sure she would like to make some nice wolf friends or something.",
    scheduleId: 3,
  },
];

// make an array of dates.
let date = "";

//This camp is the first 3 days of May, starting at 9am, ending 3pm.:
let start1 = [];
let end1 = [];
for (let i=0;i<4;i++){

  //I think the time gets saved as to greenwich mean time which is kind of annoying but it's ok for sample data I guess.
  date = new Date(`2024-05-0${1+i}T09:00:00.000`);
  start1.push(date);
  date = new Date(`2024-05-0${1+i}T15:00:00.000`);
  end1.push(date);
}

//This camp is every Saturday in June, starting at 9am, ending 3pm.:
let start2 = [];
let end2 = [];
let days = 0;
let dayNum;

for (let i=0;i<5;i++){
  // console.log("hi");
  days = () => {
    if ((1+i*7).toString().length==1){
      // console.log("hi")
      return `0${(1+i*7)}`;
    } else {
      return `${(1+i*7)}`;
    }
  };
  dayNum = days();

  date = new Date(`2024-06-${dayNum}T09:00:00.000`);
  start2.push(date);
  date = new Date(`2024-06-${dayNum}T15:00:00.000`);
  end2.push(date);
}

//This camp is every weekend in July, starting at 3pm, ending 7pm.:
let start3 = [];
let end3 = [];
for (let i=0;i<4;i++){

  days = () => {
    if ((6+i*7).toString().length==1){
      // console.log("hi")
      return `0${(6+i*7)}`;
    } else {
      return `${(6+i*7)}`;
    }
  };
  dayNum = days();

  date = new Date(`2024-07-${dayNum}T15:00:00.000`);
  start3.push(date);
  date = new Date(`2024-07-${dayNum}T19:00:00.000`);
  end3.push(date);
}

const schedules = [
  {
    id: 1,
    name: "Camp BearCub",
    desc: "The first 3 days of May, 9am - 3pm.",
    startList: start1,
    endList: end1,
  },
  {
    id: 2,
    name: "Badger Days",
    desc: "Every Saturday in June, 9am - 3pm.",
    startList: start2,
    endList: end2,
  },
  {
    id: 3,
    name: "BunBun Club",
    desc: "Every weekend in July, 3pm - 7pm.",
    startList: start3,
    endList: end3,
  },
]

// This gives an idea of how busy the camps will be. It is displayed in the dashboard as a bar chart.
// This array will be generated later by a filtered database query and processing by getAttendance in data.ts.
// This is just an example.
const expectedAttendance = [
  {period: 1, children: 10 },
  {period: 2, children: 15 },
  {period: 3, children: 22 },
  {period: 4, children: 19 },
  {period: 5, children: 23 },
  {period: 6, children: 5 },
  {period: 7, children: 19 },
];
function test(){
  console.log(reservations)
  console.log(schedules)
  console.log(expectedAttendance)
};
// test();

const users = [
  {
    //There does need to be an id but I just autoincrement
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

module.exports = {
  reservations,
  expectedAttendance,
  schedules,
  users,
};
