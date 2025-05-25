import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Divider,
  Chip,
  Avatar,
  Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";

// Define a base URL para as APIs
const API_URL = process.env.REACT_APP_API_URL || "http://localhost";

const API_BASE_URL = {
  usuarios: `${API_URL}/api/usuarios`,
  salas: `${API_URL}/api/salas`,
  reservas: `${API_URL}/api/reservas`,
};

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
  });
  const [salaForm, setSalaForm] = useState({ nome: "", capacidade: 0 });
  const [reservaForm, setReservaForm] = useState({
    usuarioId: "",
    salaId: "",
    dataHora: "",
  });
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#2196f3",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#f50057",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode
              ? "0 4px 20px 0 rgba(0,0,0,0.5)"
              : "0 4px 20px 0 rgba(0,0,0,0.08)",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? "0 10px 30px 0 rgba(0,0,0,0.6)"
                : "0 10px 30px 0 rgba(33,150,243,0.15)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            padding: "8px 24px",
          },
          contained: {
            boxShadow: darkMode
              ? "0 3px 8px rgba(0,0,0,0.5)"
              : "0 3px 8px rgba(33,150,243,0.25)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: darkMode
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
          },
          head: {
            fontWeight: 700,
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(33,150,243,0.05)",
          },
        },
      },
    },
  });

  // Carregar dados na montagem do componente
  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line
  }, []);

  const fetchAllData = () => {
    fetchData("salas", setSalas);
    fetchData("reservas", setReservas);
    fetchData("usuarios", setUsuarios);
  };

  const fetchData = async (endpoint, setter) => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE_URL[endpoint]);
      console.log(`Dados de ${endpoint} carregados com sucesso:`, res.data);
      setter(res.data);
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      showNotification(`Erro ao buscar ${endpoint}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const clearForm = () => {
    setForm({ nome: "", email: "", cpf: "", dataNascimento: "" });
  };

  const clearSalaForm = () => {
    setSalaForm({ nome: "", capacidade: 0 });
  };

  const clearReservaForm = () => {
    setReservaForm({ usuarioId: "", salaId: "", dataHora: "" });
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_BASE_URL.usuarios, {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf || null,
        dataNascimento: form.dataNascimento || null,
      });
      showNotification("Usuário cadastrado com sucesso!");
      fetchData("usuarios", setUsuarios);
      clearForm();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      showNotification("Erro ao criar usuário", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSala = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_BASE_URL.salas, salaForm);
      showNotification("Sala cadastrada com sucesso!");
      fetchData("salas", setSalas);
      clearSalaForm();
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      showNotification("Erro ao criar sala", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReserva = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_BASE_URL.reservas, {
        usuarioId: reservaForm.usuarioId,
        salaId: reservaForm.salaId,
        dataHora: reservaForm.dataHora,
      });
      showNotification("Reserva criada com sucesso!");
      fetchData("reservas", setReservas);
      clearReservaForm();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      showNotification("Erro ao criar reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarPorCpf = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL.usuarios}/${cpf}`);
      if (response.data) {
        showNotification(
          `Usuário encontrado: ${response.data.nome}`,
          "success"
        );
      } else {
        showNotification("Usuário não encontrado!", "warning");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário por CPF:", error);
      showNotification("Erro ao buscar usuário", "error");
    } finally {
      setLoading(false);
      setCpf("");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Função para formatar data em formato amigável
  const formatDateTime = (dateString) => {
    try {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("pt-BR", options);
    } catch (e) {
      return dateString;
    }
  };

  // Renders para cada aba
  const renderUsuarios = () => (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonAddIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Cadastrar Novo Usuário
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleSubmitUsuario}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nome Completo"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      placeholder="Digite o nome completo"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      placeholder="exemplo@email.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CPF"
                      name="cpf"
                      value={form.cpf}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="000.000.000-00"
                      inputProps={{ maxLength: 14 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Data de Nascimento"
                      name="dataNascimento"
                      type="date"
                      value={form.dataNascimento}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <PersonAddIcon />
                        )
                      }
                      disabled={loading}
                      sx={{ mt: 1 }}
                    >
                      {loading ? "Cadastrando..." : "Cadastrar Usuário"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SearchIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Buscar Usuário por CPF
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleBuscarPorCpf}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="CPF do Usuário"
                      name="cpf"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      variant="outlined"
                      required
                      placeholder="000.000.000-00"
                      helperText="Digite o CPF sem pontuação ou com formato 000.000.000-00"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      type="submit"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SearchIcon />
                        )
                      }
                      disabled={loading}
                    >
                      {loading ? "Buscando..." : "Buscar Usuário"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PeopleIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      Usuários Cadastrados
                    </Typography>
                  </Box>
                  <Chip
                    label={`Total: ${usuarios.length}`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />

                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : usuarios.length > 0 ? (
                  <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nome</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {usuarios.map((usuario) => (
                          <TableRow key={usuario.id} hover>
                            <TableCell>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    mr: 1,
                                    bgcolor: "primary.main",
                                  }}
                                >
                                  {usuario.nome.charAt(0)}
                                </Avatar>
                                {usuario.nome}
                              </Box>
                            </TableCell>
                            <TableCell>{usuario.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography color="textSecondary">
                      Nenhum usuário cadastrado
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSalas = () => (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <MeetingRoomIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Cadastrar Nova Sala
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleSubmitSala}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nome da Sala"
                      name="nome"
                      value={salaForm.nome}
                      onChange={(e) =>
                        setSalaForm({ ...salaForm, nome: e.target.value })
                      }
                      variant="outlined"
                      required
                      placeholder="Ex: Sala de Reuniões A"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Capacidade"
                      name="capacidade"
                      type="number"
                      value={salaForm.capacidade}
                      onChange={(e) =>
                        setSalaForm({ ...salaForm, capacidade: e.target.value })
                      }
                      variant="outlined"
                      required
                      InputProps={{ inputProps: { min: 1 } }}
                      helperText="Número máximo de pessoas"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <AddIcon />
                        )
                      }
                      disabled={loading}
                      sx={{ mt: 1 }}
                    >
                      {loading ? "Cadastrando..." : "Cadastrar Sala"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MeetingRoomIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    Salas Disponíveis
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => fetchData("salas", setSalas)}
                    disabled={loading}
                    size="small"
                  >
                    <RefreshIcon />
                  </IconButton>
                  <Chip
                    label={`Total: ${salas.length}`}
                    color="primary"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : salas.length > 0 ? (
                <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                  <Grid container spacing={2}>
                    {salas.map((sala) => (
                      <Grid item xs={12} sm={6} key={sala.id}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                          <CardContent>
                            <Typography
                              variant="h6"
                              component="h3"
                              gutterBottom
                            >
                              {sala.nome}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                              }}
                            >
                              <PeopleIcon
                                fontSize="small"
                                color="action"
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="body2">
                                Capacidade: <b>{sala.capacidade} pessoas</b>
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography color="textSecondary">
                    Nenhuma sala cadastrada
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderReservas = () => (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EventAvailableIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Criar Nova Reserva
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleSubmitReserva}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Selecione o Usuário"
                      name="usuarioId"
                      value={reservaForm.usuarioId}
                      onChange={(e) =>
                        setReservaForm({
                          ...reservaForm,
                          usuarioId: e.target.value,
                        })
                      }
                      variant="outlined"
                      required
                      disabled={usuarios.length === 0}
                      helperText={
                        usuarios.length === 0 ? "Nenhum usuário cadastrado" : ""
                      }
                    >
                      {usuarios.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PersonIcon
                              fontSize="small"
                              sx={{ mr: 1, color: "primary.main" }}
                            />
                            {user.nome}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Selecione a Sala"
                      name="salaId"
                      value={reservaForm.salaId}
                      onChange={(e) =>
                        setReservaForm({
                          ...reservaForm,
                          salaId: e.target.value,
                        })
                      }
                      variant="outlined"
                      required
                      disabled={salas.length === 0}
                      helperText={
                        salas.length === 0 ? "Nenhuma sala cadastrada" : ""
                      }
                    >
                      {salas.map((sala) => (
                        <MenuItem key={sala.id} value={sala.id}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <MeetingRoomIcon
                              fontSize="small"
                              sx={{ mr: 1, color: "primary.main" }}
                            />
                            {sala.nome} - {sala.capacidade} pessoas
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Data e Hora da Reserva"
                      type="datetime-local"
                      name="dataHora"
                      value={reservaForm.dataHora}
                      onChange={(e) =>
                        setReservaForm({
                          ...reservaForm,
                          dataHora: e.target.value,
                        })
                      }
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      required
                      helperText="Selecione data e hora para a reserva"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <BookmarkAddedIcon />
                        )
                      }
                      disabled={
                        loading ||
                        !reservaForm.salaId ||
                        !reservaForm.usuarioId ||
                        !reservaForm.dataHora
                      }
                      sx={{ mt: 1 }}
                    >
                      {loading ? "Reservando..." : "Confirmar Reserva"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    Reservas Agendadas
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => fetchData("reservas", setReservas)}
                    disabled={loading}
                    size="small"
                  >
                    <RefreshIcon />
                  </IconButton>
                  <Chip
                    label={`Total: ${reservas.length}`}
                    color="primary"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : reservas.length > 0 ? (
                <Box sx={{ maxHeight: 500, overflow: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Usuário</TableCell>
                        <TableCell>Sala</TableCell>
                        <TableCell>Data e Hora</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reservas.map((reserva) => {
                        const usuario = usuarios.find(
                          (u) => u.id === reserva.usuarioId
                        );
                        const sala = salas.find((s) => s.id === reserva.salaId);

                        return (
                          <TableRow key={reserva.id} hover>
                            <TableCell>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    mr: 1,
                                    bgcolor: "primary.main",
                                  }}
                                >
                                  {usuario && usuario.nome
                                    ? usuario.nome.charAt(0)
                                    : "?"}
                                </Avatar>
                                {usuario
                                  ? usuario.nome
                                  : `ID: ${reserva.usuarioId}`}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <MeetingRoomIcon
                                  fontSize="small"
                                  sx={{ mr: 1, color: "primary.main" }}
                                />
                                {sala ? sala.nome : `ID: ${reserva.salaId}`}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <AccessTimeIcon
                                  fontSize="small"
                                  sx={{ mr: 1, color: "action" }}
                                />
                                {formatDateTime(reserva.dataHora)}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography color="textSecondary">
                    Nenhuma reserva encontrada
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Crie uma nova reserva para visualizá-la aqui
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDashboard = () => (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Cards de estatísticas */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total de Usuários</Typography>
              <Typography variant="h3">{usuarios.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              bgcolor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total de Salas</Typography>
              <Typography variant="h3">{salas.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              bgcolor: theme.palette.info.light,
              color: theme.palette.info.contrastText,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total de Reservas</Typography>
              <Typography variant="h3">{reservas.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Reservas Recentes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Reservas Recentes
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : reservas.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Usuário</TableCell>
                      <TableCell>Sala</TableCell>
                      <TableCell>Data e Hora</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reservas.slice(0, 5).map((reserva) => {
                      const usuario = usuarios.find(
                        (u) => u.id === reserva.usuarioId
                      );
                      const sala = salas.find((s) => s.id === reserva.salaId);

                      return (
                        <TableRow key={reserva.id} hover>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  mr: 1,
                                  bgcolor: "primary.main",
                                }}
                              >
                                {usuario && usuario.nome
                                  ? usuario.nome.charAt(0)
                                  : "?"}
                              </Avatar>
                              {usuario
                                ? usuario.nome
                                : `ID: ${reserva.usuarioId}`}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <MeetingRoomIcon
                                fontSize="small"
                                sx={{ mr: 1, color: "primary.main" }}
                              />
                              {sala ? sala.nome : `ID: ${reserva.salaId}`}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <AccessTimeIcon
                                fontSize="small"
                                sx={{ mr: 1, color: "action" }}
                              />
                              {formatDateTime(reserva.dataHora)}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography color="textSecondary">
                    Nenhuma reserva encontrada
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <MeetingRoomIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sistema de Gerenciamento de Salas e Reservas
            </Typography>
            <Tooltip title={darkMode ? "Modo Claro" : "Modo Escuro"}>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper elevation={3}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab icon={<PersonIcon />} label="Usuários" />
              <Tab icon={<MeetingRoomIcon />} label="Salas" />
              <Tab icon={<CalendarMonthIcon />} label="Reservas" />
              <Tab icon={<DashboardIcon />} label="Dashboard" />
            </Tabs>
            <Divider />
            {tabValue === 0 && renderUsuarios()}
            {tabValue === 1 && renderSalas()}
            {tabValue === 2 && renderReservas()}
            {tabValue === 3 && renderDashboard()}
          </Paper>
        </Container>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
