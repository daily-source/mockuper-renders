# mockupper

This is a Vue-based project using vue-cli 3 and the spa-prerender plugin. This repo is used to create new mockups of sites, just for the purpose of creating and testing UX/UI of all the sites and provide code to the main application.

## Usage

Each site should have a new branch and should instantiate items from the general components folder. **Please create a new folder under ./src/components with the name of the site**. This is very important, as it's much easier to modify the components of each site if they are separated like this.

So, for the GiveItUpForGood site, you should have a folder named "GiveItUp" or "GiveItUpForGood", where the banner, header, fundraiser form and other elements reside.

The views should instantiate those components.

**Shared** components should go into a **Shared** folder.

**Branding is important: please add your own set in the base.scss file, overriding the original values**

## Bulma

Please use only bulma as the CSS framework, as the skeleton was made using it.

## Mobile-first

Please develop the site using a mobile-first approach. This implies using only min-width media queries, and also make use of the site breakpoints and mixins.

Example:
```scss
.nonprofit-extended {
  &__about {
    width: 100%

    @include breakpoint($tablet) {
      width: 50%;
    }
    @include breakpoint($widescreen) {
      width: 66.66667%;
    }
  }
}
```

## xthon-core library and workflow
This project makes use of the xthon-core library, which includes the general components and also (preferably) the container components. It also includes the store actions, but in the future, it should be extendable, so that new store modules can be added to the container (aka the site that is intantiating the modules).

In order to use the library, you need to run ```git submodule init``` and ```git submodule update``` right after cloning the project. Notice that this will set the library to a specific commit, in a detached state. If you intend to work with the core library (which often should be the case), then it makes sense to move the tip to master: ```git checkout master``` in the /src/xthon-core path.

Notice that the container is also depending on a package coming from the xthon-core library. This was made in order to allow the main site to install also the library dependencies in the container, so that a new dependency does not need to be added to each of the sites as well, if it's required by one component in the library. The package itself is of no use except by the package.json dependencies list.

Also, each container/site should have its own folder of components inside the library. This helps if other sites want to reuse the components, and they won't be included on each site's build if they are not instantiated. In the case of the store, for now we are using a global store. This could be enhanced by the use of modules, so it's a WIP.

### Workflow
The git workflow when working with submodules is important. Please do the following:
- Go to the xthon-core library and ensure that you are on a working branch. When setting up the project, the container will point the tip to a specific commit, but if you intend to perform changes, you need to checkout master and then create a new branch before performing any change.
- If you perform changes to the container, just commit there from the root of the container (/).

- If you perform changes to the library, do the following:
1. First, commit the changes to the library (/src/xthon-core)
2. Then, go up to the root of the container and commit the changes to the parent site. Notice that when running ```git status```, it should show something like this:

```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   build/webpack.server.config.js
  modified:   package.json
  modified:   src/app.js
  modified:   src/xthon-core (new commits)
  modified:   yarn.lock
```
and not something like this:
```
  modified:   src/xthon-core (modified content)
```
which would imply that there are uncommited changes to the library.

This order should be followed strictly, to avoid unnecessary commits and to ensure the parent repo is always up-to-date with the most recent changes in the library.


3. If there are changes to the package.json file in the library, these need to be reflected in the parent. Bump the version in the library following (https://semver.org/)[https://semver.org/] guidelines, commit and push to the remote. After that, create a tag and push it to the remote:
```
git tag -a v0.0.25
git push origin v.0.0.25
```

Then, update the library version in the container's package.json file to reflect that exact version:
```
"xthon-core": "github:dailysourceorg/xthon-core#0.0.25"
```

## Initial Set up
Perform the following changes when creating a new container site.

1. Update google fonts: there's an entry in the ```/build/webpack.base.config.js``` file where this bit needs to be updated with the corresponding fonts:
```
new GoogleFontsPlugin({
  fonts: [
    { family: "Source Sans Pro" },
    { family: "Oswald", variants: [ "400", "700italic" ] }
  ]
})
```
2. Modify the scss vars in ```src/assets/base.scss``` to reflect the new fonts and also to match the branding of the new site.


### Update the site's meta and images
Go to ./src/App.vue and update the site's meta description, which will be used as the default if the views are not owerwriting it.

Also, update the favicon and app logos in the public folder. These are site (container)-specific, therefore they are not included in the library.


# .env

Please add a .env file with the following values:
VUE_APP_IRS_SEARCH_API_URL='https://irs-eomf-search-api.herokuapp.com/v1'
VUE_APP_BASE_API='https://vthon-vue-ssr.herokuapp.com/api'
VUE_APP_FB_APP_ID='542100222812055'
VUE_APP_COMMENT_API='https://wt-9c78551d704acfbbfbeb0bb6cca86e9a-0.sandbox.auth0-extend.com/volunteerathon-comment'

## Project setup
```
yarn install
```
> Notice you will need vue-cli 3
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```
### Deployment

This repo should be connected to a static server that is re-deployed each time a commit goes to the site branch. To avoid a lot of deployments, better create a feature branch and then merge with the specific branch.

Please note that this repo does not feature a json server and also doesn't make use of an external API. All the values are fixed in the store, so if you need to change wordings or contents of the site, do those changes there in the store definition.