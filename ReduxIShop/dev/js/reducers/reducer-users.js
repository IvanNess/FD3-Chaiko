export default function(state=null, action){
    switch(action.type){
        case 'SAVE':
          console.log('SAVE reducer')
          console.log(action.payload);
          let isSaved = false;
          for(let param in action.payload.validateArr){
              if(action.payload.validateArr[param].errorMessage==''){
                  isSaved = true;
              } else{
                  isSaved = false;
                  break;
              }
          }
          if(isSaved){
              let activeUserId = action.payload.activeUser.id;
              state.every((v,i,a)=>{
                  //debugger;
                  if (v.id!=activeUserId){
                    return true;
                  } else{
                    for(let param in action.payload.validateArr){
                        //debugger;
                        v[param] = action.payload.validateArr[param].value;
                    };
                    return false;
                  }
              });
              console.log('NEW state');
              console.log(state);
              state = [...state];

              return state;
          }
          case 'DELETE':
              console.log('USER DELETE');
              state.every((v,i,a)=>{
                  if(v.id==action.payload.activeUser.id){
                      state.splice(i, 1);
                      return false;
                  } else{
                      return true;
                  }
              })
              return state;
        }
    return !state? 
    [
        {
            id: 1,
            first: "Bucky",
            last: "Roberts",
            age: 71,
            description: "Bucky is a React developer and YouTuber",
            thumbnail: "http://i.imgur.com/7yUvePI.jpg"
        },
        {
            id: 2,
            first: "Joby",
            last: "Wasilenko",
            age: 27,
            description: "Joby loves the Packers, cheese, and turtles.",
            thumbnail: "http://i.imgur.com/52xRlm8.png"
        },
        {
            id: 3,
            first: "Madison",
            last: "Williams",
            age: 24,
            description: "Madi likes her dog but it is really annoying.",
            thumbnail: "http://i.imgur.com/4EMtxHB.png"
        }
    ]
    :
    state;
}