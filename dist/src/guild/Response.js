"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const Track_1 = require("./Track");
class Response {
    tracks;
    loadType;
    playlistInfo;
    constructor(response, requester) {
        if (response.loadType === "playlist") {
            this.tracks = response.data?.tracks?.map((track) => new Track_1.Track(track, requester));
        }
        else {
            this.tracks = this.handleTracks(response.data, requester);
        }
        this.loadType = response?.loadType;
        this.playlistInfo = response.data?.playlistInfo;
    }
    handleTracks(data, requester) {
        if (Array.isArray(data)) {
            return data?.map((track) => new Track_1.Track(track, requester));
        }
        else {
            return [new Track_1.Track(data, requester)];
        }
    }
}
exports.Response = Response;
//# sourceMappingURL=Response.js.map