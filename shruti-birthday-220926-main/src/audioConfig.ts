/**
 * =========================================================================
 * 🎵 AUDIO CONFIGURATION FILE (તમારું ગીત અહી ઉમેરો)
 * =========================================================================
 * 
 * આ ફાઇલમાં તમે તમારું મનપસંદ ગીત (Song/Music) સીધું જ ઉમેરી શકો છો!
 * 
 * 📌 કઈ રીતે ગીત ઉમેરવું (How to add your song):
 * -------------------------------------------------------------------------
 * ૧. Online Audio URL:
 *    જો તમારી પાસે કોઈ MP3 / Audio લિંક હોય, તો નીચે `songUrl` માં મૂકી દો.
 *    ઉદાહરણ: 
 *    songUrl: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
 * 
 * ૨. Local File:
 *    જો તમે પ્રોજેક્ટમાં `/assets/song.mp3` અથવા `/song.mp3` મૂકો, તો:
 *    songUrl: "/song.mp3",
 * 
 * ૩. ગીતનું ટાઇટલ બદલવા:
 *    `songTitle` માં તમારા મનપસંદ ગીતનું નામ લખો (જે ઉપર પ્લેયરમાં દેખાશે).
 * 
 * ૪. જો songUrl ખાલી ("") રાખશો:
 *    તો ઑટોમેટિકલી સ્વીટ મ્યુઝિક બોક્સ (Romantic Chimes Melody) વાગશે.
 * =========================================================================
 */

export interface CustomAudioSettings {
  /** તમારું Song URL અથવા local file path (e.g. "https://.../song.mp3" અથવા YouTube URL / ID) */
  songUrl: string;

  /** ગીતનું નામ (જે screen પર મ્યુઝિક પ્લેયરમાં દેખાશે) */
  songTitle: string;

  /** પ્રારંભિક વોલ્યુમ 0.1 થી 1.0 સુધી (દા.ત. 0.8 એટલે 80% volume) */
  defaultVolume: number;

  /** પહેલી ક્લિક વખતે ઓટોમેટિક પ્લે કરવું? (true / false) */
  autoPlayOnFirstClick: boolean;

  /** વેબસાઇટ ખૂલતા જ સીધું (Direct) પ્લે કરવું */
  autoPlayDirectOnLoad: boolean;
}

export const CUSTOM_AUDIO_CONFIG: CustomAudioSettings = {
  // 👉 ૧. તમારું ગીત (YouTube URL / Audio):
  songUrl: "https://youtu.be/kF_f3PxnPC0",

  // 👉 ૨. ગીતનું નામ:
  songTitle: "Tore Aage Main Sar Ko Jhuka Doon 🎵",

  // 👉 ૩. ગીતનો વોલ્યુમ (0.1 થી 1.0):
  defaultVolume: 1.0,

  // 👉 ૪. સ્ક્રીન પર પહેલી ક્લિક સાથે મ્યુઝિક શરૂ કરવું?
  autoPlayOnFirstClick: true,

  // 👉 ૫. વેબસાઇટ શરૂ થતાં જ સીધું વગાડવું (Direct Auto-play):
  autoPlayDirectOnLoad: false,
};
