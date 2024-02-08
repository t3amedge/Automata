import { Poru } from "../Poru";
const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export interface trackData {
  encoded: string;
  info: trackInfo;
  pluginInfo: any,
  userData: any
}

export interface trackInfo {
  identifier: string;
  isSeekable: boolean;
  author: string;
  length: number;
  isStream: boolean;
  title: string;
  uri: string;
  sourceName: string;
  image?: string,
  artworkUrl: string,
  isrc: string | null;
  requester?: any
}


export class Track {
  public track: string;
  public info: trackInfo;
  public pluginInfo: any
  public userData: any

  constructor(data: trackData, requester?: any) {
    this.track = data.encoded;
    this.pluginInfo = data.pluginInfo,
      this.userData = data.userData
    this.info = {
      identifier: data.info.identifier,
      isSeekable: data.info.isSeekable,
      author: data.info.author,
      length: data.info.length,
      isStream: data.info.isStream,
      sourceName: data.info.sourceName,
      title: data.info.title,
      uri: data.info.uri,
      artworkUrl: data.info.artworkUrl || null,
      isrc: data.info.isrc,
      requester
    };
  }


  public async resolve(poru: Poru) {
    const query = [this.info.author, this.info.title]
      .filter((x) => !!x)
      .join(" - ");
    const result: any = await poru.resolve({ query, source: poru.options.defaultPlatform || "ytsearch", requester: this.info.requester });
    if (!result || !result.tracks.length) return;

    if (this.info.author) {
      const author = [this.info.author, `${this.info.author} - Topic`];
      const officialAudio = result.tracks.find(
        (track) =>
          author.some((name) =>
            new RegExp(`^${escapeRegExp(name)}$`, "i").test(track.info.author)
          ) ||
          new RegExp(`^${escapeRegExp(this.info.title)}$`, "i").test(
            track.info.title
          )
      );
      if (officialAudio) {
        this.info.identifier = officialAudio.info.identifier;
        this.track = officialAudio.track;
        return this;
      }
    }
    if (this.info.length) {
      const sameDuration = result.tracks.find(
        (track: trackData) =>
          track.info.length >= (this.info.length ? this.info.length : 0) - 2000 &&
          track.info.length <= (this.info.length ? this.info.length : 0) + 2000
      );
      if (sameDuration) {
        this.info.identifier = sameDuration.info.identifier;
        this.track = sameDuration.track;
        return this;
      }
    }
    this.info.identifier = result.tracks[0].info.identifier;
    this.track = result.tracks[0].track;
    return this;
  }
}