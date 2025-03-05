package encora.spark.breakable_toy.backend.services.impl;

import encora.spark.breakable_toy.backend.config.CustomAuthenticationToken;
import encora.spark.breakable_toy.backend.services.SpotifyService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class SpotifyServiceImpl implements SpotifyService {

    private static final String SPOTIFY_API_URL = "https://api.spotify.com/v1";
    private final RestTemplate restTemplate;
    private final HttpHeaders spotifyHeaders = new HttpHeaders();

    public SpotifyServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Map getTopArtists(CustomAuthenticationToken principal){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/me/top/artists",
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody();
    }

    @Override
    public Map getArtistById(String id, CustomAuthenticationToken principal){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/artists/" + id,
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody();

    }

    @Override
    public Map getArtistTopTracksById(String id, CustomAuthenticationToken principal, int limit){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/artists/" + id + "/top-tracks",
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();

        if (limit > 0 && responseBody != null && responseBody.containsKey("tracks")) {
            List<Map<String, Object>> tracks = (List<Map<String, Object>>) responseBody.get("tracks");

            responseBody.put("tracks", tracks.subList(0, Math.min(limit, tracks.size())));
        }

        return responseBody;

    }

    @Override
    public Map getArtistAlbumsById(String id, CustomAuthenticationToken principal){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/artists/" + id + "/albums",
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody();

    }


    @Override
    public Map getAlbumById(String id, CustomAuthenticationToken principal){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/albums/" + id,
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody();

    }

    @Override
    public Map getSearchResults(String query, String type, CustomAuthenticationToken principal){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/search?q=" + query + "&type=" + type,
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody();

    }

    @Override
    public Map getUserData(CustomAuthenticationToken principal){

        spotifyHeaders.setBearerAuth(principal.getSpotifyToken());

        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                SPOTIFY_API_URL + "/me",
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody();
    }

}
