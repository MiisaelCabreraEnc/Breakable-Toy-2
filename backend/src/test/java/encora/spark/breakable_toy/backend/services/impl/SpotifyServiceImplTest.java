package encora.spark.breakable_toy.backend.services.impl;

import encora.spark.breakable_toy.backend.config.CustomAuthenticationToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class SpotifyServiceImplTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private CustomAuthenticationToken principal;

    @InjectMocks
    private SpotifyServiceImpl spotifyService;

    private HttpHeaders spotifyHeaders;
    private Map<String, Object> mockResponse;

    @BeforeEach
    void setUp() {
        spotifyHeaders = new HttpHeaders();
        mockResponse = Map.of("key", "value");
    }

    @Test
    void testGetTopArtists() {
        // Given
        when(principal.getSpotifyToken()).thenReturn("valid_token");
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        when(restTemplate.exchange(
                eq("https://api.spotify.com/v1/me/top/artists"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        )).thenReturn(responseEntity);

        // When
        Map response = spotifyService.getTopArtists(principal);

        // Then
        assertNotNull(response);
        assertEquals("value", response.get("key"));
        verify(restTemplate, times(1)).exchange(
                eq("https://api.spotify.com/v1/me/top/artists"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        );
    }

    @Test
    void testGetArtistById() {
        // Given
        String artistId = "artist123";
        when(principal.getSpotifyToken()).thenReturn("valid_token");
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        when(restTemplate.exchange(
                eq("https://api.spotify.com/v1/artists/" + artistId),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        )).thenReturn(responseEntity);

        // When
        Map response = spotifyService.getArtistById(artistId, principal);

        // Then
        assertNotNull(response);
        assertEquals("value", response.get("key"));
        verify(restTemplate, times(1)).exchange(
                eq("https://api.spotify.com/v1/artists/" + artistId),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        );
    }

    @Test
    void testGetArtistTopTracksById() {
        // Given
        String artistId = "artist123";
        int limit = 3;
        when(principal.getSpotifyToken()).thenReturn("valid_token");

        // Crear un mapa mutable en lugar de uno inmutable
        Map<String, Object> mockTracksResponse = new HashMap<>();
        mockTracksResponse.put("tracks", List.of(
                Map.of("track", "testTrack1"),
                Map.of("track", "testTrack2"),
                Map.of("track", "testTrack3")
        ));

        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockTracksResponse);
        when(restTemplate.exchange(
                eq("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        )).thenReturn(responseEntity);

        // When
        Map response = spotifyService.getArtistTopTracksById(artistId, principal, limit);

        // Then
        assertNotNull(response);
        assertEquals(3, ((List) response.get("tracks")).size());
        verify(restTemplate, times(1)).exchange(
                eq("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        );
    }


    @Test
    void testGetSearchResults() {
        // Given
        String query = "test query";
        String type = "artist";
        when(principal.getSpotifyToken()).thenReturn("valid_token");
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        when(restTemplate.exchange(
                eq("https://api.spotify.com/v1/search?q=" + query + "&type=" + type),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        )).thenReturn(responseEntity);

        // When
        Map response = spotifyService.getSearchResults(query, type, principal);

        // Then
        assertNotNull(response);
        assertEquals("value", response.get("key"));
        verify(restTemplate, times(1)).exchange(
                eq("https://api.spotify.com/v1/search?q=" + query + "&type=" + type),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        );
    }

    @Test
    void testGetUserData() {
        // Given
        when(principal.getSpotifyToken()).thenReturn("valid_token");
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        when(restTemplate.exchange(
                eq("https://api.spotify.com/v1/me"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        )).thenReturn(responseEntity);

        // When
        Map response = spotifyService.getUserData(principal);

        // Then
        assertNotNull(response);
        assertEquals("value", response.get("key"));
        verify(restTemplate, times(1)).exchange(
                eq("https://api.spotify.com/v1/me"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(Map.class)
        );
    }
}
