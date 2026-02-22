# Tv-Shows-Dashboard

It is simple demo app that list TV shows from [TV MAZE API](https://www.tvmaze.com/api).  
It contain three main pages/views and search functionality

### Home

Home page displays list of TV shows grouped by Genre. TV shows are sorted by their ratings, shows with high rating comes first without rating appear last.
On top on header there is pagination component to load more tv shows. Also header contains a search component to search tv shows with keyword.

### Show Details

Selecting a show on home page will redirect to show details page which displays details of the selected show. Clicking back button or main title logo in header redirect back to home page.

### Search Results:

Searching a TV show in provided search box in header, will redirect to search results page listing matching TV shows in a grid. Selecting a show again redirect to show details page. Back button on search page will redirect to last visited page from history

## Architecture Decision

Frameowrk: Vue  
Why choose this?  
As assignment require to use Vue Js and also Vue very much suitable for implementing the assignment because it
is performant and versatile framework for building web user interfaces.

Language: Typescript  
Why choose this?  
Using TypeScript with Vue enhances code quality by catching errors early during development, improving predictability and maintainability. It also provides better tooling support, such as autocompletion and inline error detection, making it easier to work.

Testing Tool : Vitest  
Why choose this?  
Vitest is a lightweight and fast testing framework built on Vite, designed to integrate with modern JavaScript and TypeScript projects smoothly. With Vitest, one can benefit from first-class ES module support, instant test execution, and a familiar Jest-compatible API, making it an excellent choice for front-end applications.

State Management: Pinia  
Why choose this?  
Pinia has emerged as the official and modern solution for state management in Vue 3 applications, and for good reason. Its seamless integration with the Composition API, strong TypeScript support, simplified API, and modular structure make it a natural fit for both small and large-scale projects.

Scaffolding Tool used : create-vue  
Why choose this?  
create-vue is based on Vite which is currently fastest build and bundle tool which comes with many awsome feature. Vite consists of two major parts a dev server with HMR and a build command that is pre-configured to
output highly optimized static assets for production.

## System Configuration

node version "^20.19.0 || >=22.12.0" and
npm version 11.7.0

## Git Repository

[Repos Url](https://github.com/kingmahendra/tv-shows-assignment.git)  
https://github.com/kingmahendra/tv-shows-assignment.git

Clone with following command

```sh
 git clone https://github.com/kingmahendra/tv-shows-assignment.git
```

This command will create folder in local machine, move to that folder and follow project setup
commands mentioned below

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
