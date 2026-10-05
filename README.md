# ELOWZ — edits do canal

Projeto [Remotion](https://www.remotion.dev) com as edições dos Shorts do canal **elowz** (@elowzzz).

## Short 01 — "you build my game"

- **Vídeo final:** [`renders/ELOWZ_Short01.mp4`](renders/ELOWZ_Short01.mp4), em 1080x1920, 60 fps, ~30,6 s, H.264 com áudio AAC 320k.
- **Formato:** vertical 9:16 para TikTok, Reels e Shorts.
- **Composição:** `Short01` em [`src/short01/Short01.tsx`](src/short01/Short01.tsx).
- **Roteiro e guia de edição originais:** em [`docs/`](docs).

### Como a edição foi feita

- **Referência de estilo:** canal TEG (@TheRealTEG):
  - legenda palavra por palavra, branca, minúscula, com contorno preto grosso;
  - legenda um pouco abaixo do centro;
  - gameplay em tela cheia com o avatar centralizado;
  - cortes rápidos e zoom/blur nas trocas de cena.
- **Identidade do canal:** vermelho, preto e branco. As palavras-chave da legenda ficam em vermelho, no padrão `*palavra*` no array `caps`.
- **Tudo centralizado:** legendas, cards e o título final ficam no meio da tela. Assim funcionam em 9:16, 4:5 e 1:1 e não ficam embaixo da interface do TikTok, Reels ou Shorts.
- **Voz:** `public/voice_master.wav` é a gravação original (`voice.mp3`) com passa-alta, compressão leve e loudness -14 LUFS.
  - A voz foi cortada em 5 trechos para tirar o silêncio entre as frases.
  - A frase final "let me see in the comments" saiu, como pedia o guia: o vídeo termina seco na pergunta.
- **Legendas:** transcritas com Whisper local (`scripts/transcribe.mjs`) e conferidas com o modelo `large-v3-turbo`. O texto e os tempos estão no próprio `Short01.tsx`.
- **Efeitos:**
  - zoom lento em todos os takes;
  - zoom-blur e flash nas trocas de capítulo;
  - punch-in em "you guys";
  - tremida de câmera nos acertos PERFECT;
  - repetição proposital do mesmo take em "over and over";
  - cards de comentário simulados em "comment literally anything" e "I'll pick one".
- **SFX:** sintetizados com ffmpeg em `public/sfx` (whoosh, impacto, pop, ding, tick). São sutis, sem som de meme.
- **Música:** não tem, de propósito. Adicione um áudio em alta direto no TikTok, Reels ou Shorts, com volume baixo (5–10%), por baixo da voz. Isso ajuda no alcance.

### Clipes usados

`public/clips` tem só os trechos usados, recortados das gravações do OBS (que ficam em `C:\Users\PICHAU\Videos`). O nome de cada arquivo indica o segundo da gravação original em que o trecho começa, por exemplo `own_022_50.mp4` = "PLAYING MY OWN GAME" a partir de 22,50 s.

As gravações de gameplay **não têm áudio do jogo**: a faixa de áudio do OBS veio vazia. Para os próximos vídeos, ative "Áudio do desktop" no OBS para capturar os sons do jogo.

## Comandos

Instalar as dependências:

```bash
npm i
```

Abrir o preview interativo (Remotion Studio):

```bash
npm run dev
```

Renderizar o Short 01:

```bash
npx remotion render Short01 out/ELOWZ_Short01.mp4 --codec=h264 --crf=17 --x264-preset=slow --jpeg-quality=100 --audio-codec=aac --audio-bitrate=320k --color-space=bt709
```

Gerar stills de conferência de alguns frames:

```bash
node scripts/stills.mjs Short01 out 10 600 1190
```

Transcrever um áudio novo (cria legendas em JSON):

```bash
node scripts/transcribe.mjs public/voice.mp3 scripts/voice-captions.json large-v3-turbo
```
