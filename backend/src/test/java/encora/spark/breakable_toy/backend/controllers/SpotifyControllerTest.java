package encora.spark.breakable_toy.backend.controllers;

import encora.spark.breakable_toy.backend.config.CustomAuthenticationToken;
import encora.spark.breakable_toy.backend.services.SpotifyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Collections;
import java.util.Map;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

class SpotifyControllerTest {

    private MockMvc mockMvc;
    private SpotifyService spotifyService;
    private CustomAuthenticationToken mockPrincipal;

    @BeforeEach
    void setUp() {

        //Given
        spotifyService = mock(SpotifyService.class);
        SpotifyController spotifyController = new SpotifyController(spotifyService);
        mockMvc = MockMvcBuilders.standaloneSetup(spotifyController).build();

        mockPrincipal = mock(CustomAuthenticationToken.class);
    }

    @Test
    void testGetUserDataShouldReturnUserData() throws Exception {
        //Given
        Map<String, String> mockResponse = Collections.singletonMap("user", "testUser");

        //When
        when(spotifyService.getUserData(mockPrincipal)).thenReturn(mockResponse);

        //Then
        mockMvc.perform(get("/me/")
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user", is("testUser")));
    }

    @Test
    void testGetTopArtistsShouldReturnArtists() throws Exception {
        //Given
        Map<String, String> mockResponse = Collections.singletonMap("artist", "testArtist");

        //When
        when(spotifyService.getTopArtists(mockPrincipal)).thenReturn(mockResponse);

        //Then
        mockMvc.perform(get("/me/top/artists")
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.artist", is("testArtist")));
    }

    @Test
    void testGetArtistShouldReturnArtistById() throws Exception {
        //Given
        String artistId = "123";
        Map<String, String> mockResponse = Collections.singletonMap("id", artistId);

        //When
        when(spotifyService.getArtistById(artistId, mockPrincipal)).thenReturn(mockResponse);

        //Then
        mockMvc.perform(get("/me/artists/{id}", artistId)
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(artistId)));
    }

    @Test
    void testGetArtistTopTracksByIdShouldReturnTracks() throws Exception {
        //Given
        String artistId = "456";
        int limit = 5;
        Map<String, Object> mockResponse = Collections.singletonMap("tracks", Collections.emptyList());

        //When
        when(spotifyService.getArtistTopTracksById(artistId, mockPrincipal, limit)).thenReturn(mockResponse);

        //Then
        mockMvc.perform(get("/me/artists/top/tracks/{id}", artistId)
                        .param("limit", String.valueOf(limit))
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tracks", is(Collections.emptyList())));
    }

    @Test
    void testGetArtistAlbumsByIdShouldReturnAlbums() throws Exception {
        //Given
        String artistId = "789";
        Map<String, Object> mockResponse = Collections.singletonMap("albums", Collections.emptyList());

        //When
        when(spotifyService.getArtistAlbumsById(artistId, mockPrincipal)).thenReturn(mockResponse);

        //Then
        mockMvc.perform(get("/me/artists/albums/{id}", artistId)
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.albums", is(Collections.emptyList())));
    }

    @Test
    void testGetAlbumShouldReturnAlbumById() throws Exception {
        //Given
        String albumId = "101";
        Map<String, String> mockResponse = Collections.singletonMap("id", albumId);

        //When
        when(spotifyService.getAlbumById(albumId, mockPrincipal)).thenReturn(mockResponse);

        //Then
        mockMvc.perform(get("/me/albums/{id}", albumId)
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(albumId)));
    }

    @Test
    void testSearchShouldReturnSearchResults() throws Exception {
        //Given
        String query = "test";
        String type = "artist";
        Map<String, Object> mockResponse = Collections.singletonMap("results", Collections.emptyList());

        //When
        when(spotifyService.getSearchResults(query, type, mockPrincipal)).thenReturn(mockResponse);

        mockMvc.perform(get("/me/search")
                        .param("query", query)
                        .param("type", type)
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.results", is(Collections.emptyList())));
    }
}
