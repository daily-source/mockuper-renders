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