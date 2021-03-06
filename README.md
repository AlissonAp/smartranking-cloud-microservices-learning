# SmartRanking - Clean microservice API to manage challenges
API to manage rankings, challenges and matches between players using the microservices methodology with nestjs, rabbitmq, mongodb, aws ses, s3 and cognito

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/AlissonAp/smartranking-cloud-microservices-learning">
    <img src="https://i.ibb.co/CzMLhCH/Captura-de-Tela-2021-05-19-a-s-23-13-02.png" alt="Logo">
  </a>

  <p align="center">
    ·
    <a href="https://github.com/AlissonAp/smartranking-cloud-microservices-learning/issues">Report Bug</a>
    ·
    <a href="https://github.com/AlissonAp/smartranking-cloud-microservices-learning/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

This project was built based on the studies presented in the course https://www.udemy.com/course/constrizando-um-backend-escalavel-com-nestjs-aws-e-pivotalws/ aiming to improve the learning about the concept of microservices and cloud services such as S3, SES and Cognito.

In addition to the application of concepts demonstrated in the course, care was also taken to apply a clean architecture during the development of microservices, addressing concepts of Single Responsibility, segregation of interfaces, inversion of dependencies and the principle of open-closed.

The project contains 4 microservices and one api-gateway to handle the http requests between microservices.

<br />
<p align="center">
    <img src="api-gateway/requirements/diagrams/application_domain.png" alt="Logo">
</p>

## Available endpoints

<br />
<p align="center">
    <img src="api-gateway/requirements/diagrams/categories_endpoints.png" alt="Logo">
</p>

<br />
<p align="center">
    <img src="api-gateway/requirements/diagrams/players_endpoints.png" alt="Logo">
</p>

<br />
<p align="center">
    <img src="api-gateway/requirements/diagrams/challenges_endpoints.png" alt="Logo">
</p>

<br />
<p align="center">
    <img src="api-gateway/requirements/diagrams/rankings_endpoints.png" alt="Logo">
</p>

<br />
<p align="center">
    <img src="api-gateway/requirements/diagrams/authentication_endpoints.png" alt="Logo">
</p>


### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [NestJS](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [RabbitMQ](https://www.rabbitmq.com/)
* [AWS S3](https://aws.amazon.com/s3/)
* [AWS SES](https://aws.amazon.com/ses/)
* [AWS COGNITO](https://aws.amazon.com/cognito/)

<!-- GETTING STARTED -->
## Getting Started

To make changes to the project first have node, npm and nestjs installed and docker / docker-compose for start the micro-services dependencies

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AlissonAp/smartranking-cloud-microservices-learning.git
   ```
2. Install NPM packages for every micro-service (api-gateway, micro-admin, micro-challenge, micro-rankings, micro-notification)
   ```sh
   npm install
   ```
3. Run Docker Compose for every micro-service that have `docker-compose.yaml`
   ```sh
   docker-compose up -d
   ```
4. Run the microservice app in dev environment
   ```sh
   npm run start:dev
   ```

## Usage

To make requests to the available endpoints, run the api-gateway microservice and go to `localhost:3000/api/v1/documentation`

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Todo List

- [ ] Add unit tests
- [ ] Add contract tests
- [ ] Add support for circuit break
- [ ] Use gRPC communication
- [ ] Add saga orchestration data pattern

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-url]: https://github.com/AlissonAp/smartranking-cloud-microservices-learning/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AlissonAp/smartranking-cloud-microservices-learning.svg?style=for-the-badge
[forks-url]: https://github.com/AlissonAp/smartranking-cloud-microservices-learning/network/members
[stars-shield]: https://img.shields.io/github/stars/AlissonAp/smartranking-cloud-microservices-learning.svg?style=for-the-badge
[stars-url]: https://github.com/AlissonAp/smartranking-cloud-microservices-learning/stargazers
[issues-shield]: https://img.shields.io/github/issues/AlissonAp/smartranking-cloud-microservices-learning.svg?style=for-the-badge
[issues-url]: https://github.com/AlissonAp/smartranking-cloud-microservices-learning/issues
[license-shield]: https://img.shields.io/github/license/AlissonAp/smartranking-cloud-microservices-learning.svg?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://br.linkedin.com/in/alisson-allebrandt-05b526156
