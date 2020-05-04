<template>
  <div>
    <div class="home">
      <div class="overlay">
        <div class="header">
          <Logo />
        </div>
        <div class="content">
          <HomeContent v-bind:messages="messages" />
        </div>
      </div>
    </div>
    <div class="about">
      <div class="heading space-bottom-1">
        About ipsum generator
      </div>
      <div class="title typography-10 space-bottom-1">
        How many languages do we support?
      </div>
      <div class="description typography-6 space-bottom-2">
        We currently support following languages. Please contact us, if you need
        support for any specific language not in the list
        <ul>
          <li>English</li>
          <li>German</li>
          <li>French</li>
          <li>Spanish</li>
          <li>Russian</li>
          <li>Tamil</li>
        </ul>
      </div>
      <div class="title typography-10 space-bottom-1">
        What are the generation strategies listed in settings?
      </div>
      <div class="description typography-6 space-bottom-2">
        We do generate random text using different strategies. Following are the
        details on how each strategy works.
        <ul>
          <li>
            Lorem ipsum
            <div class="typography-4 space-bottom-1">
              Classic generation of text from a list of random content taken
              from a source literature. The source of content varies for each
              language and is mentioned in the settings page on where the
              content is sourced
            </div>
          </li>
          <li>
            Random gibberish
            <div class="typography-4 space-bottom-1">
              Constructed with random combination of alphabets. Consonants and
              vowels are interspersed to produce words that can be pronounced
            </div>
          </li>
          <li>
            Meaningful sentence
            <div class="typography-4 space-bottom-1">
              Using advanced linguistics methods in artificial intelligence, a
              unique meaningful sentence is generated dynamically. Not supported
              currently and will be added soon
            </div>
          </li>
        </ul>
      </div>
      <div class="title typography-10 space-bottom-1">
        How do we generate content for languages other than English?
      </div>
      <div class="description typography-6 space-bottom-2"></div>
      <div class="title typography-10 space-bottom-1">
        Where does Lorem ipsum text comes from?
      </div>
      <div class="description typography-6 space-bottom-2">
        The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of
        Cicero's De finibus bonorum et malorum. The physical source may have
        been the 1914 Loeb Classical Library edition of De finibus, where the
        Latin text, presented on the left-hand (even) pages, breaks off on page
        34 with "Neque porro quisquam est qui do-" and continues on page 36 with
        "lorem ipsum ...", suggesting that the galley type of that page was
        mixed up to make the dummy text seen today. The discovery of the text's
        origin is attributed to Richard McClintock, a Latin scholar at
        Hampden–Sydney College. McClintock connected Lorem ipsum to Cicero's
        writing sometime before 1982 while searching for instances of the Latin
        word consectetur, which was rarely used in classical literature.
        McClintock first published his discovery in a 1994 letter to the editor
        of Before & After magazine, contesting the editor's earlier claim that
        Lorem ipsum had no meaning.
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from './HomeContent.vue';
import Logo from '@/components/Logo/Logo.vue';

export default {
  name: 'Home',
  components: {
    HomeContent,
    Logo,
  },
  data: function() {
    return {
      messages: [
        'Lorem ipsum dolor sit amet',
        "Quoi colérique une d'outre c'était cet vestphalien",
        "Étendu les c'était s'ouvrit fraîcheur hébreu s'écriatelle",
        'தர்மத்தில் வேண்டும் வேகம் அன்பு உண்டு',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat center center;
  background-size: cover;
  .overlay {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: var(--color-overlay-home);
    display: grid;
    grid-template-rows: auto 1fr;
    .header {
      display: flex;
      justify-content: flex-start;
      padding: 20px;
      align-items: center;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.about {
  min-height: 100vh;
  background-color: var(--color-foreground-1);
  color: var(--color-background-2);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: flex-start;
  padding: 20px;
  margin: auto;
  .heading {
    font-size: 50px;
  }
  .content {
    line-height: 1.5;
  }
}
</style>
