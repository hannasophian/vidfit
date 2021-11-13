import videolist from "./videolist.json";
import Video from "./Video";

export default function getVideos(duration: number, tags: string[]) {
  let vids = [];
  let noOfTags = tags.length;
  switch (duration) {
    case 10: //1 tag, max 1 video
      let vid1 = getRandomElement(
        searchForTime(searchForTags(tags[0]), 0, duration)
      );
      if (!vid1) {
        vid1 = getRandomElement(
          searchForTime(searchForTags("general"), 0, duration)
        );
      }
      vids.push(vid1);
      break;
    case 15 /*1 tag, max 2 vid*/:
      vid1 = getRandomElement(
        searchForTime(searchForTags(tags[0]), 0, duration)
      );
      vids.push(vid1);
      if (vid1.duration <= 10) {
        let vid2 = getRandomElement(
          searchForTime(searchForTags("general"), 5, 5)
        );
        vids.push(vid2);
      }
      break;
    case 20: //1-2 tags, max 2 vids
      if (tags.length === 1) {
        //if only 1 tag, find 1 vid + another if vid1 < 15 mins
        let vid1 = getRandomElement(
          searchForTime(searchForTags(tags[0]), 15, duration)
        );
        vids.push(vid1);
        if (vid1.duration <= 15) {
          let vid2 = getRandomElement(
            searchForTime(searchForTags("general"), 5, duration - vid1.duration)
          );
          vids.unshift(vid2);
        }
      } else {
        // if 2 tags, vid1 = 10-12, vid2 = 20 - vid1
        let vid1 = getRandomElement(
          searchForTime(searchForTags(tags[0]), 10, 12)
        );
        vids.push(vid1);
        let vid2 = getRandomElement(
          searchForTime(
            searchForTags(tags[1]),
            duration - vid1.duration - 5,
            duration - vid1.duration
          )
        );
        vids.push(vid2);
      }
      break;
    case 30: //1-2 tags, max 2 vids
      if (tags.length === 1) {
        // 1 tag: vid1 = 20-30, if vid1<25, vid2 = duration-vid1
        let vid1 = getRandomElement(
          searchForTime(searchForTags(tags[0]), 20, duration)
        );
        vids.push(vid1);
        if (vid1.duration <= 25) {
          let vid2 = getRandomElement(
            searchForTime(
              searchForTags("general"),
              duration - vid1.duration - 5,
              duration - vid1.duration
            )
          );
          vids.unshift(vid2);
        }
      } else {
        //2 tags: vid1:10 to 20 mins, vid2 = duration-vid1
        let vid1 = getRandomElement(
          searchForTime(searchForTags(tags[0]), 10, 20)
        );
        vids.push(vid1);
        if (vid1.duration <= 25) {
          let vid2 = getRandomElement(
            searchForTime(
              searchForTags(tags[1]),
              duration - vid1.duration - 5,
              duration - vid1.duration
            )
          );
          vids.push(vid2);
        }
      }
      break;
    case 45: //1-2 tags, max 2 vids
      switch (noOfTags) {
        case 1: //1 tag: vid1 = 30-45, if vid1<40 vid2 = duration-vid1
          let vid1 = getRandomElement(
            searchForTime(searchForTags(tags[0]), 30, 45)
          );
          vids.push(vid1);
          if (vid1.duration <= 40) {
            let vid2 = getRandomElement(
              searchForTime(
                searchForTags("general"),
                duration - vid1.duration - 5,
                duration - vid1.duration
              )
            );
            vids.unshift(vid2);
          }
          break;
        case 2: //2 tags: find video with both tags else:
          let possibleVids = searchForTwoTags(tags[0], tags[1]);
          if (possibleVids.length >= 1) {
            //if more than or equal to 1, pick random. vid2 = duration - vid1 with random tag
            let vid1 = getRandomElement(searchForTime(possibleVids, 0, 45));
            if (vid1.duration <= 40) {
              let vid2 = getRandomElement(
                searchForTime(
                  searchForTags(getRandomElement([...tags, "general"])),
                  duration - vid1.duration - 5,
                  duration - vid1.duration
                )
              );
              vids.unshift(vid2);
            }
          } else {
            // if no vids with both tags
            let vid1 = getRandomElement(
              searchForTime(searchForTags(tags[0]), 15, 25)
            );
            vids.push(vid1);
            if (vid1.duration <= 25) {
              let vid2 = getRandomElement(
                searchForTime(
                  searchForTags(tags[1]),
                  duration - vid1.duration - 5,
                  duration - vid1.duration
                )
              );
              vids.push(vid2);
            }
          }
      }
      break;
    case 60: //1-3 tags
      let workoutDuration = 0;
      switch (noOfTags) {
        case 1:
          let nextvid;
          let vid1 = getRandomElement(
            searchForTime(searchForTags(tags[0]), 20, 60)
          );
          vids.push(vid1);
          workoutDuration += vid1.duration;
          while (workoutDuration <= 55) {
            nextvid = getRandomElement(
              searchForTime(
                searchForTags(getRandomElement([tags[1], "general"])),
                60 - workoutDuration - 10,
                60 - workoutDuration
              )
            );
            vids.push(nextvid);
            console.log(nextvid);
            workoutDuration += nextvid.duration;
          }
          break;
        case 2: //if two tags, get video with both tags
          let possibleVids = searchForTwoTags(tags[0], tags[1]);
          if (possibleVids.length >= 1) {
            //if more than 1, pick random. vid2 = duration - vid1 with random tag
            let vid1 = getRandomElement(searchForTime(possibleVids, 0, 60));
            vids.push(vid1);
            if (vid1.duration <= 55) {
              let vid2 = getRandomElement(
                searchForTime(
                  searchForTags(getRandomElement(tags)),
                  duration - vid1.duration - 5,
                  duration - vid1.duration
                )
              );
              vids.push(vid2);
            }
          } else {
            //if no vids with both tags, only get videos with 1
            let vid1 = getRandomElement(
              searchForTime(searchForTags(tags[0]), 25, 40)
            );
            vids.push(vid1);
            let vid2 = getRandomElement(
              searchForTime(
                searchForTags(tags[1]),
                duration - vid1.duration - 5,
                duration - vid1.duration
              )
            );
            vids.push(vid2);
          }
          break;
        case 3:
          // let vid1;
          // let nextvid;
          let totalDuration = 0;
          let possibleVids2 = searchForThreeTags(tags[0], tags[1], tags[2]);
          if (possibleVids2.length >= 1) {
            // if only 1 video with all tags
            let vid1 = getRandomElement(searchForTime(possibleVids2, 0, 60));
            vids.push(vid1);
            totalDuration += vid1.duration;
            while (totalDuration <= 50) {
              let nextvid = getRandomElement(
                searchForTime(
                  searchForTags(getRandomElement(tags)),
                  10,
                  duration - totalDuration
                )
              );
              vids.push(nextvid);
              totalDuration += nextvid.duration;
            }
          } else {
            //if no videos with all tags
            let vid1 = getRandomElement(
              searchForTime(searchForTags(getRandomElement(tags)), 15, 25)
            );
            vids.push(vid1);
            totalDuration += vid1.duration;
            while (totalDuration <= 50) {
              let nextvid = getRandomElement(
                searchForTime(
                  searchForTags(getRandomElement(tags)),
                  duration - totalDuration - 15,
                  duration - totalDuration
                )
              );
              vids.push(nextvid);
              totalDuration += nextvid.duration;
            }
          }
      }
  }
  return vids;
}

function searchForTags(tag: string) {
  let vidTags = videolist.filter((video) => video.tags.includes(tag));
  return vidTags;
}

function searchForTwoTags(tag1: string, tag2: string) {
  let vidTags = videolist.filter(
    (video) => video.tags.includes(tag1) && video.tags.includes(tag2)
  );
  return vidTags;
}

function searchForThreeTags(tag1: string, tag2: string, tag3: string) {
  let vidTags = videolist.filter(
    (video) =>
      video.tags.includes(tag1) &&
      video.tags.includes(tag2) &&
      video.tags.includes(tag3)
  );
  return vidTags;
}

function searchForTime(taggedVids: Video[], minTime: number, maxTime: number) {
  let vidTime = [];
  for (let video of taggedVids) {
    if (video.duration >= minTime && video.duration <= maxTime) {
      vidTime.push(video);
    }
  }
  return vidTime;
}

function getRandomElement(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// console.log(getRandomElement([1,2,3,4]))
// console.log(getVideos(10, ["yoga"]));
// console.log(getVideos(10, ["pilates"]));
// console.log(getVideos(15, ["butt"]));
// console.log(getVideos(20, ["yoga"]));
// console.log(getVideos(20, ["arms", "yoga"]));
// console.log(getVideos(30, ["dance"]));
// console.log(getVideos(30, ["legs", "HIIT"]));
// console.log(getVideos(45, ["butt"]))
// console.log(getVideos(45, ["butt", "legs"]))
// console.log(getVideos(60, ["back"]));
// console.log(getVideos(60, ["butt", "legs"]));
// console.log(getVideos(60, ["legs", "yoga"]));
// console.log(getVideos(60, ["HIIT", "cardio", "full-body"]));
// console.log(getVideos(60, ["HIIT", "dance", "yoga"]));
