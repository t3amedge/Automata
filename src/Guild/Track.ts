import { PlaylistData } from '../Interfaces/ManagerInterfaces';
import { TrackData } from '../Interfaces/TrackInterfaces';

export class AutomataTrack {
	/** The Base64 encoded track. */
	track?: string;
	/** The identifier of the track. */
	identifier?: string;
	/** The URL of the song's artwork. */
	artworkUrl?: string;
	/** The ISRC of the track. */
	isrc?: string;
	/** The author of the track. */
	author?: string;
	/** The title of the track. */
	title?: string;
	/** The length of the track in milliseconds. */
	length?: number;
	/** The URI of the track. */
	uri?: string;
	/** Indicates if the track is seekable. */
	isSeekable?: boolean;
	/** Indicates if the track is a stream. */
	isStream?: boolean;
	/** The name of the source providing the track. */
	sourceName?: string;
	/** The requester of the track. */
	requester?: unknown;

	/**
   	 * Creates a new AutomataTrack instance from TrackData or PlaylistData.
   	 * @param data The track data.
   	 * @param requester The requester of the track.
   	*/
	constructor(data: TrackData | PlaylistData, requester: unknown) {
		if ('tracks' in data) {
			const playlist = data;
			if (playlist.tracks.length > 0) {
				const firstTrack = playlist.tracks[0].info;
				this.track = firstTrack.track;
				this.identifier = firstTrack.identifier;
				this.artworkUrl = firstTrack.artworkUrl;
				this.isrc = firstTrack.isrc;
				this.author = firstTrack.author;
				this.title = firstTrack.title;
				this.length = firstTrack.length;
				this.uri = firstTrack.uri;
				this.isSeekable = firstTrack.isSeekable;
				this.isStream = firstTrack.isStream;
				this.sourceName = firstTrack.sourceName;
			}
		}
		else {
			let trackData: TrackData;

			if (Array.isArray(data)) trackData = data[0];
			else trackData = data;

			const {
				encoded,
				info: {
					identifier,
					author,
					title,
					length,
					uri,
					isSeekable,
					isStream,
					sourceName,
					artworkUrl,
				},
			} = trackData;

			this.track = encoded;
			this.identifier = identifier;
			this.author = author;
			this.title = title;
			this.length = length;
			this.uri = uri;
			this.isSeekable = isSeekable;
			this.isStream = isStream;
			this.sourceName = sourceName;
			this.artworkUrl = artworkUrl;
		}

		this.requester = requester;
	}
}

