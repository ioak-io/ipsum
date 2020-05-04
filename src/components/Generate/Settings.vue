<template>
  <div class="settings">
    <div>
      <div class="typography-8 space-bottom-1">Language</div>
      <OakSwitch
        theme="primary"
        v-bind:data="data.language"
        v-bind:objects="staticData.language"
        @change="event => $emit('change', 'language', event.target.value)"
      />
    </div>
    <div>
      <div class="typography-8 space-bottom-1">Text generation strategy</div>
      <OakRadio
        theme="secondary"
        v-bind:data="data.strategy"
        v-bind:objects="staticData.strategy[data.language]"
        @change="event => $emit('change', 'strategy', event.target.value)"
      />
    </div>
    <div>
      <div class="typography-8 space-bottom-1">Unit</div>
      <OakRadio
        theme="secondary"
        v-bind:data="data.unit"
        v-bind:objects="staticData.unit"
        @change="event => $emit('change', 'unit', event.target.value)"
      />
    </div>
  </div>
</template>
<script>
import OakRadio from '@/oakui/OakRadio.vue';
import OakSwitch from '@/oakui/OakSwitch.vue';
export default {
  name: 'Settings',
  props: {
    data: Object,
  },
  data: function() {
    return {
      staticData: {
        strategy: {
          en: [
            {
              key: 'lorem',
              value: 'Lorem ipsum',
            },
            {
              key: 'random',
              value: 'Gibberish',
            },
            {
              key: 'nlg',
              value: 'Meaningful sentence (not supported)',
            },
          ],
          de: [
            {
              key: 'lorem',
              value: 'Lorem ipsum',
              caption:
                "basierend auf Inhalten von Wittgenstein's Philosophische Untersuchungen. Dialogues 32, 43, 44, 45, 515",
            },
            {
              key: 'random',
              value: 'Zufälliges alphabet',
            },
            {
              key: 'nlg',
              value: 'Meaningful sentence (not supported)',
            },
          ],
          es: [
            {
              key: 'lorem',
              value: 'Lorem ipsum',
              caption:
                'basado en el contenido de Don Quixote. Capítulo XXXIII (Donde se cuenta la novela del Curioso impertinente)',
            },
            {
              key: 'random',
              value: 'Alfabeto al azar',
            },
            {
              key: 'nlg',
              value: 'Meaningful sentence (not supported)',
            },
          ],
          fr: [
            {
              key: 'lorem',
              value: 'Lorem ipsum',
              caption:
                "basé sur le contenu de Voltaire's Candide, ou l'Optimisme. Chapter 9 (Ce qui advint de Cunégonde, de Candide, du grand-inquisiteur, et d'un Juif)",
            },
            {
              key: 'random',
              value: 'Alphabet aléatoire',
            },
            {
              key: 'nlg',
              value: 'Meaningful sentence (not supported)',
            },
          ],
          ru: [
            {
              key: 'lorem',
              value: 'Lorem ipsum',
              caption:
                'основанный на, Война и мир Льва Толстого. Том 3 Часть 1',
            },
            {
              key: 'random',
              value: 'случайные алфавиты',
            },
            {
              key: 'nlg',
              value: 'Meaningful sentence (not supported)',
            },
          ],
          ta: [
            {
              key: 'lorem',
              value: 'Lorem ipsum',
              caption:
                'பொன்னியின் செல்வன் அடிப்படையில் உருவாக்கப்பட்டது. ஐந்தாம் பாகம் - தியாக சிகரம் அத்தியாயம் 3 - கடல் பொங்க',
            },
            {
              key: 'random',
              value: 'சீரற்ற எழுத்துக்கள்',
            },
            {
              key: 'nlg',
              value: 'அர்த்தமுள்ள வாக்கியம்',
            },
          ],
        },
        unit: [
          {
            key: 'paragraph',
            value: 'Paragraph',
          },
          {
            key: 'sentence',
            value: 'Sentence',
          },
        ],
        language: [
          {
            key: 'en',
            value: 'English',
          },
          {
            key: 'de',
            value: 'German',
          },
          {
            key: 'fr',
            value: 'French',
          },
          {
            key: 'es',
            value: 'Spanish',
          },
          {
            key: 'ru',
            value: 'Russian',
          },
          {
            key: 'ta',
            value: 'Tamil',
          },
        ],
      },
    };
  },
  components: { OakRadio, OakSwitch },
};
</script>
<style lang="scss" scoped>
.settings {
  display: grid;
  grid-template-rows: auto;
  row-gap: 30px;
  justify-content: flex-start;
}
</style>
