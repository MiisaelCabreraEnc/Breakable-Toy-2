package encora.spark.breakable_toy.backend.services;

import encora.spark.breakable_toy.backend.config.CustomAuthenticationToken;

import java.util.Map;

public interface SpotifyService {
    Map getTopArtists(CustomAuthenticationToken principal);

    Map getArtistById(String id, CustomAuthenticationToken principal);

    Map getArtistTopTracksById(String id, CustomAuthenticationToken principal, int limit);

    Map getArtistAlbumsById(String id, CustomAuthenticationToken principal);

    Map getAlbumById(String id, CustomAuthenticationToken principal);

    Map getSearchResults(String query, String type, CustomAuthenticationToken principal);

    Map getUserData(CustomAuthenticationToken principal);
}
