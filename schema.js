const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInteger,
    GraphQLList
} = require('graphql');

import personData from "./persons.json";

import jobData from "./JobQueue.json";

import {myJobs,allJobs} from "./JobQueueHelper";

const PersonType = new GraphQLObjectType({
    name:"Person",
    description: "Person Model with personal details",

    fields: () =>({
        name: {
            type: GraphQLString,
            resolve: (data) => {
                return data.Doctor1.name;
            }
        },
        age: {
            type: GraphQLString,
            resolve: (data) => {
                return data.Doctor1.age;
            }
        }
    })
})

const JobType = new GraphQLObjectType({
    name:"Job",
    description:"ARS job details",

    fields: () =>({
        jobid: {
            type: GraphQLString,
            description: "This is the unique identifier for any ARS jobs.",
            resolve: (data) => {
                return data.jobid;
            }
        },
        jobname: {
            type: GraphQLString,
            description: "This describes the primary task of the ARS Job.",
            resolve: (data) => {
                 return data.jobname;
            }
        },
        jobstatus: {
            type: GraphQLString,
            description: "job status is the current status of the job. It can be either 'Accepted','ENRoute','Approaching' or 'Completed'.For Tow job there is additional status 'At Drop Off'.",
            resolve: (data) => {
                  return data.jobstatus;
            }
        },
        drivername: {
            type: GraphQLString,
            description: "The name of the driver who is at rescue for the customer.",
            resolve: (data) => {
                 return data.drivername;
            }
        },
        customerName: {
            type: GraphQLString,
            description:"Name of the Roadside assistance requester.Customers can request through any customer digital channels.",
            resolve: (data) => {
                 return data.customerName;
            }
        },
        customerconatct: {
            type: GraphQLString,
            description:"Contact number of the customer.",
            resolve: (data) => {
            return data.customercontactno;
            }
        },
        eta: {
            type: GraphQLString,
            description:"Estimated time of arrival at rescue.It is dynamic and can be updated by provider or driver with relevant reasons.",
            resolve: (data) => {
             return data.eta;
            }
        },
        jobarriveddate: {
            type: GraphQLString,
            description:"Job arrived time at Mobile front end. This is a difference of latency and actual reported time",
            resolve: (data) => {
             return data.jobarriveddate;
            }
        },
        Addr1: {
            type: GraphQLString,
            description:"Rescue address.",
            resolve: (data) => {
             return data.Addr1;
            }
        },
        Addr2: {
            type: GraphQLString,
            description:"Rescue address extended with cross street information.",
            resolve: (data) => {
             return data.Addr2;
            }
        },
        incLat: {
            type: GraphQLString,
            description:"Incident Lattitude in numbers",
            resolve: (data) => {
             return data.incLat;
            }
        },
        incLong: {
            type: GraphQLString,
            description:"Incident Longitude in numbers",
            resolve: (data) => {
             return data.incLong;
            }
        },
        towLat: {
            type: GraphQLString,
            description:"Tow destination lattitude",
            resolve: (data) => {
             return data.towLat;
            }
        },
        towLong: {
            type: GraphQLString,
            description:"Tow destination longitude",
            resolve: (data) => {
             return data.towLong;
            }
        },
        primaryTask: {
            type: GraphQLString,
            description:"This is the primary task. Secondary task could be additional service requested from customer",
            resolve: (data) => {
             return data.primaryTask;
            }
        },
        year: {
            type: GraphQLString,
            description:"Vehicle make year",
            resolve: (data) => {
             return data.year;
            }
        },
        color: {
            type: GraphQLString,
            description:"Vehicle color",
            resolve: (data) => {
             return data.color;
            }
        },
        make: {
            type: GraphQLString,
            description:"vehicle make",
            resolve: (data) => {
             return data.make;
            }
        },
        model: {
            type: GraphQLString,
            description:"vehicle model",
            resolve: (data) => {
             return data.model;
            }
        },
        VINNumber: {
            type: GraphQLString,
            description:"VIN(Vehicle Identification Number) of the vehicle",
            resolve: (data) => {
             return data.VINNumber;
            }
        },
        vehicleMileage: {
            type: GraphQLString,
            description:"Vehicle mileage reported",
            resolve: (data) => {
             return data.vehicleMileage;
            }
        },
        isARSJob: {
            type: GraphQLString,
            description:"Differentiates between Allstate and Non-Allstate Jobs",
            resolve: (data) => {
             return data.isARSJob;
            }
        },
        isRideAlongPassengerAddressExist: {
            type: GraphQLString,
            description:"Ride along passenger count if given for Tow job.",
            resolve: (data) => {
             return data.isRideAlongPassengerAddressExist;
            }
        },
        driverId: {
            type: GraphQLString,
            description:"Unique identifier of the driver at rescue.",
            resolve: (data) => {
             return data.driverId;
            }
        }
    })
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the query for Person',

    fields: () =>({
      person: {
          type: PersonType,
          resolve: () => {
              return personData;
          }
      },
      myJobs: {
          type:JobType,
          description:"Jobs only assigned to me.",
          args: {
            jobid: { type: GraphQLString }
          },
          resolve: (root,{jobid}) => {
              return myJobs(jobid);
          }
      },
      allJobs: {
        type:GraphQLList(JobType),
        description:"Jobs assigned to me and other peer drivers under my provider account.",
        resolve: (root) => {
             return allJobs();
        }
    }
    })
})

export default new GraphQLSchema({
    query: QueryType,    
})