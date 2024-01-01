# Ipsum

The web application designed for dynamic text generation, offering a seamless and customizable experience. With the ability to generate random text content on demand, users can effortlessly create diverse textual material tailored to their needs. The application goes beyond generic randomness by providing support for presets, allowing users to input specific source corpora. This unique feature ensures that the generated text aligns with the user's desired context, making it an ideal tool for various applications.

Users have the flexibility to create and manage an unlimited number of custom presets, accommodating diverse language preferences. Whether it's for creative writing, content generation, or language exploration, our application empowers users to curate their text generation experience.

A standout feature of our application is the dynamic nature of text generation. As users copy the content, the application automatically regenerates new text, ensuring a continuous flow of fresh and relevant material. This real-time generation capability enhances productivity and creativity, making the application a valuable resource for individuals across different domains.

In summary, our web application provides a user-friendly platform for generating random text content with customizable presets, catering to various languages and contexts. The dynamic text generation feature, coupled with the ability to generate new content on the fly, makes it a versatile and indispensable tool for users seeking a unique and efficient text creation experience.

## Supported Node.js and npm Versions

This project is developed and tested with the following versions:

- Node.js: v20.0.0 or higher
- npm: v10.0.0 or higher

## Prerequisites and dependencies
- Ipsum REST API service module (https://github.com/ioak-io/ipsum-service)

## Installation

1. Clone the repository: `git clone https://github.com/ioak-io/ipsum.git`
2. Navigate to the project directory: `cd ipsum`
3. Install dependencies: `npm install`

## Usage

1. Run the development server: `npm start`
2. Open your browser and go to `http://localhost:3000` to view the app.
3. To simplify local development, the application is by default configured to connect to remote Authlite server for authentication. You may use below shared user credentials to sign in to the app. You can also choose to setup your own local version of Authlite by changing the configuration in .env files (but usually an overkill and unneccesary setup, if you are not making any changes to the authentication layer)
    - username: jane.doe@ioak.org
    - password: suddenlylastsummer
4. Create a new company to get started

## Dependency Updates

The dependencies in this project are regularly reviewed and updated. The last check for updated versions was performed on 29th Dec 2023.

To check for updates and update the dependencies, run the following command: `npm outdated`

## License

This project is licensed under the [MIT License](LICENSE).

The MIT License is a permissive open-source license that allows you to use, modify, and distribute the code, even for commercial purposes, provided you include the original copyright notice and the disclaimer of warranty.

For more information, see the [MIT License](LICENSE) file.
