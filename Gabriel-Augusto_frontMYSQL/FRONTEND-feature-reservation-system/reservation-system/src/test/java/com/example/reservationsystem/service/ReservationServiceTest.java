package com.example.reservationsystem.service;

import com.example.reservationsystem.model.Reservation;
import com.example.reservationsystem.model.Room;
import com.example.reservationsystem.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    public void testCreateReservation_overlapping() {
        Room room = new Room();
        room.setId(1L);
        Reservation existingReservation = new Reservation();
        existingReservation.setRoom(room);
        existingReservation.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 0));
        existingReservation.setEndTime(LocalDateTime.of(2024, 1, 1, 11, 0));

        Reservation newReservation = new Reservation();
        newReservation.setRoom(room);
        newReservation.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 30));
        newReservation.setEndTime(LocalDateTime.of(2024, 1, 1, 11, 30));

        when(reservationRepository.findOverlappingReservations(any(), any(), any())).thenReturn(Collections.singletonList(existingReservation));

        assertThrows(RuntimeException.class, () -> {
            reservationService.createReservation(newReservation);
        });
    }

    @Test
    public void testCreateReservation_noOverlap() {
        Room room = new Room();
        room.setId(1L);
        Reservation newReservation = new Reservation();
        newReservation.setRoom(room);
        newReservation.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 30));
        newReservation.setEndTime(LocalDateTime.of(2024, 1, 1, 11, 30));

        when(reservationRepository.findOverlappingReservations(any(), any(), any())).thenReturn(Collections.emptyList());
        when(reservationRepository.save(any())).thenReturn(newReservation);

        reservationService.createReservation(newReservation);
    }
}
