const ytsr = require('youtube-sr')
const soundcloud = require('soundcloud-scraper')
const chalk = require('chalk')

const spotifySongRegex = (/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/)
const spotifyPlaylistRegex = (/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/)
const spotifyAlbumRegex = (/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/)

module.exports = class Util {
    constructor () {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
    }

    static checkFFMPEG () {
        try {
            const prism = require('prism-media')
            prism.FFmpeg.getInfo()
            return true;
        } catch (e) {
            this.alertFFMPEG();
            return false;
        }
    }

    static alertFFMPEG () {
        console.log(chalk.red('ERROR:'), 'FFMPEG is not installed. Install with "npm install ffmpeg-static" or download it here: https://ffmpeg.org/download.html.');
    }

    static isVoiceEmpty (channel) {
        return channel.members.filter((member) => !member.user.bot).size === 0
    }

    static isSoundcloudLink (query) {
        return soundcloud.validateURL(query)
    }

    static isSpotifyLink (query) {
        return spotifySongRegex.test(query)
    }

    static isSpotifyPLLink (query) {
        return spotifyPlaylistRegex.test(query)
    }
    
    static isSpotifyAlbumLink(query) {
        return spotifyAlbumRegex.test(query)
    }

    static isYTPlaylistLink (query) {
        return ytsr.validate(query, 'PLAYLIST')
    }

    static isYTVideoLink (query) {
        return ytsr.validate(query, 'VIDEO')
    }
}
