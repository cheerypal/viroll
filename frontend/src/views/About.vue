<template>
  <div>
    <NavBar />
    <div id="about">
      <div class="container">
        <div class="dataSection">
          <h1>About Us</h1>
          <hr />
          <h2>We are a Coronavirus Statistics Site</h2>
          <ul>
            <li>Get country by country statistics</li>
            <li>
              Get data on confirmed cases, total recoveries and total deaths per
              country
            </li>
            <li>
              Search for any of our 186 data recorded countries
            </li>
            <li>Easily compare any 2 countries</li>
            <li>
              Our dynamic graphs can allow you to easily filter through daily,
              weekly, fortnightly, and monthly data. Our graphs can also be
              filtered to see spikes and overall accumulated data.
            </li>
            <li>
              Currently being maintained by Euan Gordon, a 4th year Computer
              Science student at Heriot Watt University, Edinburgh.
            </li>
          </ul>
        </div>
        <div class="dataSection">
          <h1>Our Datasource</h1>
          <hr />
          <h2><a href="https://covid19api.com/">COVID 19 API</a></h2>
          <ul>
            <li>
              VIROLL uses a public API/Datasource that was created by
              <a class="bold-important" href="https://ksred.me/">
                Kyle Redelinghuys
              </a>
              who sourced the data from
              <a
                class="bold-important"
                href="https://github.com/CSSEGISandData/COVID-19"
              >
                Johns Hopkins CSSE</a
              >.
            </li>
            <li>
              Please support this API by going to
              <a class="bold-important" href="https://covid19api.com/">
                COVID 19 API
              </a>
            </li>
            <li>
              Documentation for the API/Datasource is
              <a
                class="bold-important"
                href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest"
                >here</a
              >
            </li>
            <li>
              <a class="bold-important" href="https://covid19api.com/">
                COVID 19 API
              </a>
              gives VIROLL updated data everyday at 00:00am
            </li>
          </ul>
        </div>
        <div class="dataSection">
          <h1>Our Site is a PWA</h1>
          <hr />
          <p class="custom-para">
            This site is a PWA (Progressive Web App). This means you can
            download this as an application on desktop, or if you are on a
            mobile device, you just need to add VIROLL to your mobile's home
            screen. When used as a PWA this site becomes like any other app from
            the app store.
          </p>
          <p class="custom-para bold-important">
            Instructions to install site as a PWA:<br />
          </p>
          <ul>
            <li>
              Open the site in a
              <span class="bold-important">Browser</span> (Chrome, Firefox,
              Safari)
            </li>
            <li>
              Click the <span class="bold-important">Options Button</span>
            </li>
            <li>
              Click <span class="bold-important">Add To Home Screen</span> or
              <span class="bold-important">Install VIROLL</span>
            </li>
            <li>
              Open site from the
              <span class="bold-important">Home Screen</span> or
              <span class="bold-important">Desktop</span> and start using
            </li>
          </ul>
        </div>
        <div class="dataSection">
          <h1>Report a problem</h1>
          <hr />
          <ul>
            <li>
              If you have any issues you can email me directly
              <a class="bold-important" href="mailto:ejg9@hw.ac.uk">here!</a>
            </li>
            <li>or</li>
            <li>
              Create an issue on the
              <a
                class="bold-important"
                href="https://github.com/cheerypal/viroll"
              >
                Github repository
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>
<script>
import NavBar from "../components/navbars/nav";
import CustomFooter from "../components/navbars/custom-footer";
export default {
  name: "about",
  components: {
    NavBar,
    CustomFooter
  }
};
</script>
<style scoped>
#about {
  padding-top: 150px;
  padding-bottom: 50px;
  min-height: 100vh;
}
ul {
  list-style: none;
  padding: 20px 0;
  font-size: 1.3em;
}

li {
  padding: 15px 0;
}

.space {
  padding-top: 20px;
}

.custom-para {
  font-size: 1.3em;
}

.bold-important {
  font-family: "Roboto-Black";
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

@media screen and (max-width: 990px) {
  #about {
    padding-top: 15%;
  }
}

@media screen and (max-width: 710px) {
  .dataSection {
    padding-top: 10%;
    padding-bottom: 5%;
  }
  ul {
    font-size: 1em;
  }
  .custom-para {
    font-size: 1em;
  }
}

@media screen and (max-width: 610px) {
  #about {
    padding-top: 20%;
  }

  .dataSection {
    padding-top: 2%;
    padding-bottom: 2%;
  }
}
</style>
