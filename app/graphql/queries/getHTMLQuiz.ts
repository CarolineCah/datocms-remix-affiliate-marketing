// import { gql } from "@apollo/client";

// export const ALL_POSTS = gql`
//   query getAllPosts {
//     allPosts {
//       id
//       title
//       _status
//       _firstPublishedAt
//       quiz {
//         _modelApiKey
//         content {
//           ... on HtmlQuizQuestionOneRecord {
//             id
//             options {
//               option1
//               option2
//               option3
//               id
//               _modelApiKey
//             }
//           }
//           ... on QuizQuestionRecord {
//             id
//             option1
//             option2
//             option3
//             _modelApiKey
//           }
//         }
//         submitValue
//         submitAction
//         placeholder
//         label
//         hint
//         id
//       }
//     }
//     _allPostsMeta {
//       count
//     }
//   }
// `;
