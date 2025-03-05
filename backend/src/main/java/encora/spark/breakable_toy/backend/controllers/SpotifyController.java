package encora.spark.breakable_toy.backend.controllers;

import encora.spark.breakable_toy.backend.config.CustomAuthenticationToken;
import encora.spark.breakable_toy.backend.services.SpotifyService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/me")
public class SpotifyController {

    private final SpotifyService spotifyService;

    public SpotifyController(SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getUserData(CustomAuthenticationToken principal) {

        Map artists = spotifyService.getUserData(principal);
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/top/artists")
    public ResponseEntity<?> getTopArtists(CustomAuthenticationToken principal) {

        Map artists = spotifyService.getTopArtists(principal);
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<?> getArtist(@PathVariable String id, CustomAuthenticationToken principal) {

        Map artist = spotifyService.getArtistById(id, principal);
        return ResponseEntity.ok(artist);
    }

    @GetMapping("/artists/top/tracks/{id}")
    public ResponseEntity<?> getArtistTopTracksById(@PathVariable String id, CustomAuthenticationToken principal, @RequestParam(defaultValue = "0") String limit) {

        int limitNumber = Integer.parseInt(limit);

        Map artist = spotifyService.getArtistTopTracksById(id, principal, limitNumber);
        return ResponseEntity.ok(artist);
    }

    @GetMapping("/artists/albums/{id}")
    public ResponseEntity<?> getArtistAlbumsById(@PathVariable String id, CustomAuthenticationToken principal) {

        Map artist = spotifyService.getArtistAlbumsById(id, principal);
        return ResponseEntity.ok(artist);
    }

    @GetMapping("/albums/{id}")
    public ResponseEntity<?> getAlbum(@PathVariable String id, CustomAuthenticationToken principal) {

        Map album = spotifyService.getAlbumById(id, principal);
        return ResponseEntity.ok(album);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query, @RequestParam(defaultValue = "album,artist,track") String type, CustomAuthenticationToken principal) {

        Map searchResults = spotifyService.getSearchResults(query, type, principal);
        return ResponseEntity.ok(searchResults);
    }
}
